import { define, Form, History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Destination, Tour } from "server/models";
import resetCSS from "../css/reset";
import { Msg } from "../messages";
import { Model } from "../model";
import { formatDate } from "../utils/dates";

export class DestinationViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "tour-id" })
  tourid = "";

  @property({ type: Number })
  index = 0;

  @property({ type: Boolean })
  edit = false;

  @state()
  get tour(): Tour | undefined {
    return this.model.tour;
  }

  @state()
  get destination(): Destination | undefined {
    return this.tour?.destinations[this.index];
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
    const { name, startDate, endDate, featuredImage } =
      this.destination || ({} as Destination);
    const tourName = this.tour?.name;
    const imageUrl = this.image || featuredImage;

    console.log("Destination:", this.destination);

    const renderDisplayOrForm = () => {
      if (this.edit) {
        return html`
          <mu-form
            .init=${this.destination}
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
              <input
                type="file"
                @change=${this._handleFileSelected} />
            </label>
          </mu-form>
          <img src=${imageUrl} />
        `;
      } else {
        return html`
          <header>
            <a
              class="breadcrumb"
              href="/app/tour/${this.tourid}">
              ${tourName}
            </a>
            <h2>${name}</h2>
            <p>
              from ${formatDate(startDate)} to
              ${formatDate(endDate)}
              ${endDate && endDate.getFullYear()}
            </p>
            <a
              class="edit"
              href="/app/tour/${this.tourid}/destination/${this
            .index}/edit">
              Edit
            </a>
          </header>
          <img src=${imageUrl} />
        `;
      }
    };

    return html`
      <main class="page${this.edit ? " editing" : ""}">
        ${renderDisplayOrForm()}
      </main>
    `;
  }

  static styles = [
    resetCSS,
    css`
      :host {
        display: contents;
      }
      header {
        display: contents;
      }
      main.page {
        display: grid;
        grid-column: 1/-1;
        padding: var(--size-spacing-small)
          var(--size-spacing-medium);
        grid-template-columns: subgrid;
        grid-template-rows: auto auto auto 1fr;
        grid-template-areas:
          "bc bc xx xx xx xx xx ed"
          "h2 h2 im im im im im im"
          "p  p  im im im im im im"
          "yy yy im im im im im im";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
      }
      main.page.editing {
        grid-template-areas: "fm fm fm fm im im im im";
      }
      img {
        grid-area: im;
      }
      .breadcrumb {
        grid-area: bc;
      }
      h2 {
        grid-area: h2;
      }
      p {
        grid-area: p;
      }
      .edit {
        grid-area: ed;
      }
      mu-form {
        grid-area: fm;
      }
      input {
        grid-column: input;
      }
    `
  ];

  _handleSubmit(event: Form.SubmitEvent<Destination>) {
    console.log("Submitting form", event);
    if (this.destination && this.tour) {
      let destination = event.detail as Destination;
      if (this.image) {
        destination.featuredImage = this.image;
      }
      this.dispatchMessage([
        "tour/save-destination",
        {
          tourid: this.tourid,
          index: this.index,
          destination,
          onSuccess: () =>
            History.dispatch(this, "history/navigate", {
              href: `/app/tour/${this.tourid}/destination/${this.index}`
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
