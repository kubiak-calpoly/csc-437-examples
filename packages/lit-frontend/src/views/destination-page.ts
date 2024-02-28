import { css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { Tour, Destination, Point } from "ts-models";
import { formatDate } from "../utils/dates";
import * as App from "../app";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

type DestLocation = Location & {
  params: { tour: string; dest: string };
};

@customElement("destination-page")
export class DestinationPageElement extends App.View {
  @property({ attribute: false })
  location?: DestLocation;

  @property({ attribute: "tour-id", reflect: true })
  get tourId() {
    return this.location?.params.tour;
  }

  @property({ attribute: "dest-id", reflect: true })
  get destId() {
    return parseInt(this.location?.params.dest || "0");
  }

  @property({ reflect: true })
  get edit(): boolean {
    if (this.location?.search) {
      console.log("Checking for edit", this.location);
      const params = new URLSearchParams(this.location.search);
      return params.has("edit");
    }
    return false;
  }

  @property()
  get tour() {
    return this.getFromModel<Tour>("tour");
  }

  @property()
  get destination() {
    const tour = this.tour;
    const destinations = tour?.destinations || [];
    console.log(
      `Looking for destination ${this.destId} in`,
      destinations
    );
    return destinations[this.destId] || {};
  }

  @state()
  image? = this.destination?.featuredImage;

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    if (
      name === "tour-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Tour Page:", newValue);
      this.dispatchMessage({
        type: "TourSelected",
        tourId: newValue
      });
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  render() {
    const {
      name,
      link,
      startDate,
      endDate,
      location,
      featuredImage
    } = this.destination as Destination;
    const tourName = this.tour?.name;
    const imageUrl = this.image || featuredImage;

    const formatPoint = (loc: Point) => {
      if (!loc) {
        return "(Unknown Location)";
      }
      const latabs = Math.abs(loc.lat);
      const latsign = loc.lat < 0 ? -1 : 1;
      const lonabs = Math.abs(loc.lon);
      const lonsign = loc.lon < 0 ? -1 : 1;

      return `
        ( ${latabs}${latsign ? "N" : "S"},
        ${lonabs}${lonsign ? "E" : "W"} )
      `;
    };

    console.log("Destination:", this.destination);

    const renderDisplayOrForm = () => {
      if (this.edit) {
        const { lat, lon } = location || {};

        return html`
          <form @submit=${this._handleSubmit}>
            <dl>
              <dt>Destination Name</dt>
              <dd><input name="name" .value=${name} /></dd>
              <dt>Dates</dt>
              <dd>
                <input name="endDate" value=${startDate} />
                to
                <input name="startDate" value=${endDate} />
              </dd>
              <dt>Coordinates</dt>
              <dd>
                (
                <input
                  type="number"
                  min="0"
                  max="90"
                  name="latabs"
                  step="any"
                  value=${Math.abs(lat)} />
                <select name="latsign">
                  <option value="1" ?selected=${lat >= 0}>
                    N
                  </option>
                  <option value="-1" ?selected=${lat < 0}>
                    S
                  </option>
                </select>
                ,
                <input
                  type="number"
                  min="0"
                  max="180"
                  name="lonabs"
                  step="any"
                  value=${Math.abs(lon)} />
                <select name="lonsign">
                  <option value="1" ?selected=${lon >= 0}>
                    E
                  </option>
                  <option value="-1" ?selected=${lon < 0}>
                    W
                  </option>
                </select>
              </dd>
              <dt>Featured Image</dt>
              <dd>
                <input
                  type="file"
                  @change=${this._handleFileSelected} />
              </dd>
              <dd>
                <img src=${imageUrl} />
              </dd>
            </dl>
            <button type="submit">Submit</button>
          </form>
        `;
      } else {
        return html`
          <header>
            <a class="breadcrumb" href="/app/${this.tourId}">
              ${tourName}
            </a>
            <h2>${name}</h2>
            <p>
              from ${formatDate(startDate)} to
              ${formatDate(endDate)}
              ${endDate && endDate.getFullYear()}
            </p>
            <p>${formatPoint(location)}</p>
            <a href="?edit=t">Edit</a>
          </header>
          <a href=${link}>
            <img src=${imageUrl} />
          </a>
        `;
      }
    };

    return html`
      <main class="page">${renderDisplayOrForm()}</main>
    `;
  }

  static styles = [
    unsafeCSS(resetCSS),
    unsafeCSS(pageCSS),
    css``
  ];

  _handleSubmit(event: Event) {
    event.preventDefault(); // prevent browser from submitting form data itself

    if (this.destination && this.tourId) {
      const target = event.target as HTMLFormElement;
      const formdata = new FormData(target);
      let extract: { [key: string]: number } = {};
      let entries = Array.from(formdata.entries())
        .map(([k, v]) => (v === "" ? [k] : [k, v]))
        .map(([k, v]) => {
          const key = k.toString();
          if (
            ["latabs", "latsign", "lonabs", "lonsign"].indexOf(
              key
            ) >= 0
          ) {
            extract[key] = parseFloat(v as string);
            return [];
          } else return [k, v];
        })
        .filter((tuple) => tuple.length > 0);
      const location: Point = {
        lat: extract.latabs * extract.latsign,
        lon: extract.lonabs * extract.lonsign
      };

      entries.push([
        "featuredImage",
        this.image || this.destination.featuredImage || ""
      ]);

      const json = Object.assign(Object.fromEntries(entries), {
        location
      });

      console.log("Submitting Form", json);

      this.dispatchMessage({
        type: "DestinationSaved",
        tourId: this.tourId,
        destId: this.destId,
        destination: json as Destination
      });
    }
  }

  _handleFileSelected(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const selectedFile = (target.files as FileList)[0];

    const reader: Promise<ArrayBuffer> = new Promise(
      (resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result as ArrayBuffer);
        fr.onerror = (err) => reject(err);
        fr.readAsArrayBuffer(selectedFile);
      }
    );

    reader.then((buffer: ArrayBuffer) => {
      const { name, size, type } = selectedFile;
      const query = new URLSearchParams({ filename: name });
      const url = new URL("/images", document.location.origin);
      url.search = query.toString();

      console.log("Uploading file:", selectedFile);
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": type,
          "Content-Length": size.toString()
        },
        body: buffer
      })
        .then((res) => {
          if (res.status === 201) return res.json();
          else throw res.status;
        })
        .then((json: { url: string } | undefined) => {
          if (json) {
            console.log("Image has been uploaded to", json.url);
            this.image = json.url;
          } else throw "No JSON response";
        })
        .catch((error) => {
          console.log("Upload failed", error);
        });
    });
  }
}
