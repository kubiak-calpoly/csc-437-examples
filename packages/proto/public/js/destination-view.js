import { css, define, html, shadow } from "@unbndl/html";
import { View, createView, createViewModel, fromAttributes } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";
import {
  convertStartEndDates,
  formatDate,
  toDateString,
  nightsBetween
} from "./dateUtils.js";
import reset from "./reset.css.js";
import { BlzAccommodationElement} from "./blz-accommodation.js";


export class DestinationViewElement extends HTMLElement {
  static {
    define({
      "blz-accommodation": BlzAccommodationElement
    })
  }

  viewModel = createViewModel({
    authenticated: false,
    mode: "view",
    destination: {
      name: "Somewhere",
      startDate: new Date(),
      endDate: new Date(),
      // featuredImage: undefined,
      location: { lat: 0, lng: 0 },
      accommodations: [],
      excursions: [],
      // link: undefined
    },
    upload: {}
  }).with(fromAttributes(this), "src", "mode")
    .with(fromAuth(this), "authenticated", "token");

  view = html`
    <section>
      ${($) => View.apply2(
        $.mode === "view" ? this.mainView : this.editView, 
        $.destination,
        $.upload
      )}
    </section>
  `;

  mainView = html`
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
  `;

  editView = html`
    <form>
      <header>
        <h2>
          <input name="name" value=${$ => $.name}/>
        </h2>
      </header>
      <dl>
        <dt>Arriving on</dt>
        <dd>
          <input name="startDate" type="date" 
                 value=${$ => toDateString($.startDate)}
          />
        </dd>
        <dt>Departing on</dt>
        <dd>
          <input name="endDate" type="date"
                 value=${$ => toDateString($.endDate)}
          />
        </dd>
        <dt>Image</dt>
        <dd>
          <input type="file" />
        </dd>
        <dd>
          <img src=${(_,$) => $.url} alt="" />
        </dd>
        <dt></dt>
        <dd>
          <button id="cancel" type="button">Cancel</button>
          <button type="submit">Save</button>
        </dd>
      </dl>

      <img class="hero" alt="" src=${($) => $.featuredImage || ""} />
    </form>
  `;

  viewAccommodation = html`
    <blz-accommodation>
      <span slot="name">${($) => $.name}</span>
      <time slot="check-in" 
        datetime=${($) => $.checkIn}>
        ${($) => formatDate($.checkIn)}
      </time>
      <time slot="check-out" 
        datetime=${($) => $.checkOut}>
        ${($) => formatDate($.checkOut)}
      </time>
      <span slot="room-type">${($) => $.roomType}</span>
      <span slot="persons">${($) => $.persons}</span>
      <span slot="room-rate">${($) => $.rate.amount}</span>
      <span slot="currency">${($) => $.rate.currency}</span>
    </blz-accommodation>
  `;

  viewExcursion = html`
    <li>
      <svg class="icon">
        <use xlink:href=${($) =>
          `/icons/destination.svg#icon-${$.type}`} />
      </svg>
      <span>${($) => $.name}</span>
    </li>
  `;

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
        change: (event) => this.handleFileSelected(event)
      })
      .listen({
        submit: (ev) => this.submitForm(ev)
      });

    this.viewModel.createEffect(($) => {
      if ($.authenticated && $.src) {
        this.hydrate($.src).then((data) => {
          this.viewModel.set("destination",
            convertStartEndDates(data));
        });
      }
    })
  }

  get authorization() {
    const $ = this.viewModel.toObject();
    if ($.authenticated)
      return { Authorization: `Bearer ${$.token}` };
    else return {};
  }

  hydrate(src) {
    return fetch(src, {
      headers: this.authorization
    })
      .then((response) => {
        if (response.status !== 200)
          throw `HTTP Status ${response.status}`;
        else return response.json();
      })
      .catch((error) => {
        console.log("Could not fetch:", error);
      });
  }

  handleFileSelected(event) {
    const target = event.target;
    const selectedFile = target.files[0];

    const reader = new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = (err) => reject(err);
      fr.readAsArrayBuffer(selectedFile);
    });

    reader.then((buffer) => {
      const { name, size, type } = selectedFile;
      const query = new URLSearchParams({ filename: name });
      let url = new URL("/images", document.location.origin);
      url.search = query.toString();

      fetch(url, {
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

  submitForm(event) {
    event.preventDefault();
    const json = this.formDataToJSON(event.target);

    fetch(this.viewModel.get("src"), {
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

  formDataToJSON(form) {
    const upload = this.viewModel.get("upload");
    const inputs = Array.from(form.elements)
      .filter(
        (el) => el.tagName !== "BUTTON" && "name" in el
      );
    let entries =
      Object.entries(this.viewModel.get("destination")).concat(
        inputs.map((el) => [el.name, el.value])
      ).filter((ent) => ent[0] && ent[0] !== "_id");
    if ( upload.url ) {
      entries.push(["featuredImage", upload.url]);
    }
    return Object.fromEntries(entries);
  }

  static styles = css`
    :host { display: contents; }
    section { display: contents; }
    header {
      grid-area: hdr;
      background: none;
      color: var(--color-text);
      height: min-content;
  
      a[href] {
        color: currentColor;
      }
    }
    form { display: contents; }
    img.hero { grid-area: img; }
    blz-accommodation { grid-area: acc; }
    ul.excursions {
      display: grid;
      grid-area: exc;
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

