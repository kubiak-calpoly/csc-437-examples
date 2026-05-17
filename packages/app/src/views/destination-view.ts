import { css, define, html, shadow } from "@unbndl/html";
import { View, createView, createView2, createViewModel, fromAttributes } from "@unbndl/view";
import { Auth, fromAuth } from "@unbndl/auth";
import { Accommodation, Destination, Excursion } from "server/models";
import { AccommodationElement } from "../components/blz-accommodation.ts";
import { convertStartEndDates, formatDate, nightsBetween, toDateString, toDateTimeString} from "../utils/dates.ts";
import reset from "../styles/reset.css.ts";

type DestinationViewAttributes = {
  "tour-id": string;
  index: string;
  mode: string;
}

interface DestinationViewModel {
  authenticated: boolean;
  token?: string;
  tourId?: string;
  index: number;
  mode: string;
  destination?: Destination;
  upload: { url?: string };
};

interface Upload {
  url?: string;
}

export class DestinationViewElement extends HTMLElement {
  static {
    define({
      "blz-accommodation": AccommodationElement,
    });
  }

  viewModel = createViewModel<DestinationViewModel>({
    authenticated: false,
    mode: "view",
    index: 0,
    destination: {
      name: "Somewhere",
      startDate: new Date(),
      endDate: new Date(),
      // featuredImage: undefined,
      location: { lat: 0, lon: 0 },
      accommodations: [],
      excursions: [],
      // link: undefined
    },
    upload: {}
  }).with(fromAuth(this),
    "authenticated", "token"
  ).withRenamed(fromAttributes<DestinationViewAttributes>(this), {
    tourId: "tour-id"
  });

  view = createView<DestinationViewModel>( html`
    <section>
      ${($) => View.apply2(
        $.mode === "view" ? this.mainView : this.editView,
        $.destination,
        $.upload
      )}
    </section>
  `);

  mainView = createView<Destination>( html`
    <header>
      <h2>${($) => $.name}</h2>
      <p>${($) => nightsBetween(
        $.startDate,
        $.endDate)} nights</p>
      <nav>
        <button id="edit-mode">Edit</button>
      </nav>
    </header>
    <img class="hero" alt="" src=${($) =>
      $.featuredImage || ""} />
    ${($) => View.map(this.viewAccommodation, $.accommodations)}
    <ul class="excursions">
      ${($) => View.map(this.viewExcursion, $.excursions)}
    </ul>
  `);

  editView = createView2<Destination, Upload>( html`
    <form>
      <header>
        <h2>
          <input name="name" value=${($,_) => $.name}/>
        </h2>
      </header>
      <dl>
        <dt>Arriving on</dt>
        <dd>
          <input name="startDate" type="date"
                 value=${($, _) => toDateString($.startDate)}
          />
        </dd>
        <dt>Departing on</dt>
        <dd>
          <input name="endDate" type="date"
                 value=${($, _) => toDateString($.endDate)}
          />
        </dd>
        <dt>Image</dt>
        <dd>
          <input type="file" />
        </dd>
        <dd>
          <img src=${(_,$) => $?.url || "#"} alt="" />
        </dd>
        <dt></dt>
        <dd>
          <button id="cancel" type="button">Cancel</button>
          <button type="submit">Save</button>
        </dd>
      </dl>

      <img class="hero" alt="" src=${($, _) => $.featuredImage || ""} />
    </form>
  `);

  viewAccommodation = createView<Accommodation>( html`
    <blz-accommodation>
      <span slot="name">${($) => $.name}</span>
      <time slot="check-in"
        datetime=${($) => toDateTimeString($.checkIn)}>
        ${($) => formatDate($.checkIn)}
      </time>
      <time slot="check-out"
        datetime=${($) => toDateTimeString($.checkOut)}>
        ${($) => formatDate($.checkOut)}
      </time>
      <span slot="room-type">${($) => $.roomType}</span>
      <span slot="persons">${($) => $.persons}</span>
      <span slot="room-rate">${($) => $.rate.amount}</span>
      <span slot="currency">${($) => $.rate.currency}</span>
    </blz-accommodation>
  `);

  viewExcursion = createView<Excursion>( html`
    <li>
      <svg class="icon">
        <use xlink:href=${($) =>
          `/icons/destination.svg#icon-${$.type}`} />
      </svg>
      <span>${($) => $.name}</span>
    </li>
  `);

  constructor() {
    super();
    shadow(this)
      .styles(reset.styles,
        DestinationViewElement.styles)
      .replace(this.viewModel.render(this.view))
      .delegate("#edit-mode", {
        click: () => this.viewModel.set("mode", "edit")
      })
      .delegate("input[type=file]", {
        change: (event: Event) => this.handleFileSelected(event)
      })
      .listen({
        submit: (ev: Event) => this.submitForm(ev)
      });

    this.viewModel.createEffect(($) => {
      console.log("Executing Effect: ", $.authenticated, $.tourId, $.index);
      if ($.authenticated && $.tourId) {
        const src = `/api/destinations/${$.tourId}/${$.index}`;
        this.hydrate(src).then((dest: Destination) => {
          this.viewModel.set("destination", dest);
        });
      }
    })
  }

  get authorization(): HeadersInit {
    const $ = this.viewModel.toObject();
    if ($.authenticated)
      return { Authorization: `Bearer ${$.token}` };
    else return {};
  }

  hydrate(src : string) {
    return fetch(src, {
      headers: this.authorization
    })
      .then((response) => {
        if (response.status !== 200)
          throw `HTTP Status ${response.status}`;
        else return response.json();
      }).then((json: unknown) => {
        const dest: Destination = convertStartEndDates<Destination>(json);
        dest.accommodations = dest.accommodations.map(
          (data: unknown) => {
            const result = data as Accommodation;
            const acc = data as { checkIn: string, checkOut: string };
            result.checkIn = new Date(acc.checkIn);
            result.checkOut = new Date(acc.checkOut);
            return result;
          });
        return dest;
      }).catch((error) => {
        console.log("Could not fetch:", error);
        throw error;
      });
  }

  handleFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const selectedFile = target.files[0];

    const reader = new Promise<ArrayBuffer>((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as ArrayBuffer);
      fr.onerror = (err) => reject(err);
      fr.readAsArrayBuffer(selectedFile);
    });

    reader.then((buffer) => {
      const { name, size, type } = selectedFile;
      const query = new URLSearchParams({ filename: name });
      let url = new URL("/images", document.location.origin);
      url.search = query.toString();

      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": type,
          "Content-Length": size.toString(),
          ...this.authorization
        },
        body: buffer
      })
      .then((res) => {
        if (res.status === 201) return res.json();
        else throw res.status;
      })
      .then((json) => {
        if (json) this.viewModel.set("upload", { url: json.url});
        else throw "No JSON response";
      });
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    const json = this.formDataToJSON(event.target as HTMLFormElement);
    const src = this.viewModel.$.src;

    if (!src) return;

    fetch(src, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.authorization
      },
      body: JSON.stringify(json)
    }).then((res) => {
      if (res.status !== 200) throw `HTTP status ${res.status}`
      return res.json();
    }).then((json) => {
        this.viewModel.set("destination", convertStartEndDates(json));
      }).catch((err) => {
      console.log("Failed to PUT form data", err)
    });
  }

  formDataToJSON(form: HTMLFormElement) {
    const upload = this.viewModel.$.upload;
    const inputs = Array.from(form.elements)
      .filter(
        (el) => el.tagName !== "BUTTON" && "name" in el
      ) as Array<HTMLInputElement>;
    let entries =
      Object.entries(this.viewModel.$.destination || {}).concat(
        inputs.map((el) => [el.name, el.value])
      ).filter((ent) => ent[0] && ent[0] !== "_id");
    if ( upload.url ) {
      entries.push(["featuredImage", upload.url]);
    }
    return Object.fromEntries(entries);
  }

  static styles = css`
    :host { display: contents; }
    section {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
      row-gap: var(--page-grid-gap);
    }
    header {
      grid-column: 1 / span 2;
      background: none;
      color: var(--color-text);
      height: min-content;

      a[href] {
        color: currentColor;
      }
    }
    form { display: contents; }
    img.hero {
      grid-column: span 5 / -1;
      grid-row: 1 / 3;
    }
    blz-accommodation { grid-column: 1 / span 3; }
    ul.excursions {
      display: grid;
      grid-column: 1/-1;
      grid-template-columns: subgrid;
      list-style: none;
      padding: 0;
      gap: var(--size-spacing-large);
      font-family: var(--font-family-display);
      font-size: var(--size-type-mlarge);
      line-height: var(--font-line-height-display);

      svg.icon {
        --size-icon: var(--size-icon-large);
        color: var(--color-accent);
      }

      > li {
        display: flex;
        align-items: center;
        grid-column: auto / span 2;
        background-color: var(--color-background-card);
        padding: var(--size-spacing-medium);
        gap: var(--size-spacing-medium);
      }
    }`;
}
