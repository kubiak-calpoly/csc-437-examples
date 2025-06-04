import {
  define,
  Form,
  History,
  InputArray,
  View
} from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Destination } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

export class DestinationEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });

  @property({ attribute: "tour-id" })
  tourid = "";

  @property({ type: Number })
  index = 0;

  @state()
  get destination(): Destination | undefined {
    return this.model.tour?.destinations[this.index];
  }

  @state()
  image? = this.destination?.featuredImage;

  constructor() {
    super("blazing:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "tour-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Tour Page:", newValue);
      this.dispatchMessage([
        "tour/select",
        { tourid: newValue }
      ]);
    }
  }

  render() {
    const {
      featuredImage,
      accommodation,
      excursions = []
    } = this.destination || ({} as Destination);
    const imageUrl = this.image || featuredImage;
    const acc = accommodation || { rate: {} };

    const init = this.destination
      ? {
        ...this.destination,
        "acc-name": acc.name,
        "acc-checkIn": acc.checkIn && new Date(acc.checkIn),
        "acc-checkOut":
          acc.checkOut && new Date(acc.checkOut),
        "acc-roomType": acc.roomType,
        "acc-rate-amount": acc.rate?.amount,
        "acc-rate-currency": acc.rate?.currency,
        excursions: excursions.map((x) => x.name)
      }
      : {};

    return html`
      <main class="page">
        <mu-form
          .init=${init}
          @mu-form:submit=${this._handleSubmit}>
          <label>
            <span>Destination Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Dates</span>
            <input type="date" name="startDate" />
            to
            <input type="date" name="endDate" />
          </label>
          <label>
            <span>Featured Image</span>
            <img src=${imageUrl} />
            <input
              type="file"
              @change=${this._handleFileSelected} />
          </label>
          <fieldset>
            <h3>Accommodation</h3>
            <label>
              <span>Name</span>
              <input name="acc-name" />
            </label>
            <label>
              <span>Check-in</span>
              <input type="date" name="acc-checkIn" />
            </label>
            <label>
              <span>Check-out</span>
              <input type="date" name="acc-checkOut" />
            </label>
            <label>
              <span>Room type</span>
              <select name="acc-roomType">
                <option value="S">Single</option>
                <option value="D">Double (full bed)</option>
                <option value="Q">Queen</option>
                <option value="K">King</option>
                <option value="2T">Two twin beds</option>
                <option value="2D">Two full beds</option>
                <option value="2Q">Two queen beds</option>
                <option value="Dorm">Dormitory</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              <span>Room Rate</span>
              <input type="number" name="acc-rate-amount" />
              <select name="acc-rate-currency">
                <option value="USD" selected>USD</option>
                <option value="EUR">€</option>
              </select>
            </label>
          </fieldset>
          <fieldset>
            <h3>Excursions</h3>
            <label>
              <span></span>
            <input-array name="excursions"> </input-array>
          </fieldset>
        </mu-form>
      </main>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
      main.page {
        --page-grids: 8;

        display: grid;
        grid-column: 1/-1;
        grid-template-columns: repeat(var(--page-grids), 1fr);
        gap: var(--size-spacing-small)
          var(--size-spacing-medium);
        padding: var(--size-spacing-medium);
        grid-template-rows: auto auto 1fr auto;
        grid-template-areas: "-- fm fm fm fm fm fm -1";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
      }
      mu-form {
        display: grid;
        grid-area: fm;
        grid-template-columns: subgrid;
      }
      input {
        grid-column: input / span 2;
      }
      fieldset {
        > h3 {
          grid-column: label / end;
        }
        > label {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
      }
      @media screen and (max-width: 50rem) {
        main.page {
          --page-grids: 4;
        }
      }
      @media screen and (max-width: 30rem) {
        main.page {
          --page-grids: 2;
        }
      }
      @media screen and (min-width: 75rem) and (max-width: 100rem) {
        main.page {
          --page-grids: 12;
        }
      }
      @media screen and (min-width: 100rem) {
        main.page {
          --page-grids: 16;
        }
      }
    `
  ];

  _handleSubmit(event: Form.SubmitEvent<Destination>) {
    console.log("Submitting form", event);
    if (this.destination) {
      let json = event.detail as Form.Values;

      const ex = (n: string) => {
        const value = json[n];

        delete json[n];
        return value;
      };

      if (this.image) {
        json.featuredImage = this.image;
      }
      json.accommodation =  {
          name: ex("acc-name"),
          checkIn: ex("acc-checkIn"),
          checkOut: ex("acc-checkOut"),
          roomType: ex("acc-roomType"),
          rate: {
            amount: ex("acc-rate-amount"),
            currency: ex("acc-rate-currency")
          }
        };

      json.excursions = (json.excursions as Array<string>).map(
        (name) => ({
          name,
          type: "tour"
        })
      );

      this.dispatchMessage([
        "tour/save-destination",
        {
          tourid: this.tourid,
          index: this.index,
          destination: json as unknown as Destination,
          onSuccess: () =>
            History.dispatch(this, "history/navigate", {
              href: `/app/destination/${this.tourid}/${this.index}`
            }),
          onFailure: (err) => {
            console.log("Error saving destination", err);
          }
        }
      ]);
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
