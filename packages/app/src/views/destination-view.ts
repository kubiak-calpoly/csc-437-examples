import { Auth, define, Form, Observer, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Destination, formatDate, convertStartEndDates } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import { AccommodationElement } from "../components/accommodation";
import reset from "../styles/reset.css";

export class DestinationViewElement extends View<Model, Msg> {
  static uses = define({
    "accommodation-info": AccommodationElement,
    "mu-form": Form.Element
  });

  @property({ attribute: "tour-id" })
  tourid = "";

  @property({ type: Number })
  index?: number;

  @state()
  get destination(): Destination | undefined {
    if( this.index !== undefined ) {
      return this.model.tour?.destinations[this.index];
    }
  };

  @property()
  mode = "view";

  get src() {
    return `/api/tours/${this.tourid}/destinations/${this.index}`;
  }

  constructor() {
    super("blazing:model")
  }

  override render() {
    return this.mode === "edit" ?
      this.renderEditor() :
      this.renderView();
  }

  renderView() {
    const {
      name,
      startDate,
      endDate,
      featuredImage,
    } = this.destination || ({} as Destination);

    return html`
        <header>

          <h2>${name}</h2>
          <p>
            from ${formatDate(startDate)} to
            ${formatDate(endDate)}
            ${endDate && endDate.getFullYear()}
          </p>
          <nav>
          <button @click=${() => {
            this.mode = "edit";
          }}>
            Edit
          </button></nav>
        </header>

        <img class="hero" src=${featuredImage} />
    `;
  }

  renderEditor() {
    const {
      featuredImage,
    } = this.destination || ({} as Destination);
    const imgUrl = this._image || featuredImage;

    const init = this.destination;

    return html`
      <mu-form
        .init=${init}
        @mu-form:submit=${(e: CustomEvent) => {
          if(this.src)
            this.handleSubmit(this.src, e.detail)
        }}>
        <header>
          <h2><input name="name"></h2>
          <dl>
            <dt>"From date"</dt>
            <dd><input name="startDate" type="date"></dd>
            <dt>To date</dt>
            <dd><input name="endDate" type="date"></dd>
            <dt>Image</dt>
            <dd>
              <input
                type="file"
                @change=${(e: InputEvent) => {
                  const target = e.target as HTMLInputElement;
                  const files = target.files;
                  if (files && files.length) {
                    this.handleImageSelected(files)
                  }
                }}
              />
            </dd>
          </dl>
        </header>
        <img class="hero" src=${imgUrl} />
      </mu-form>
    `;
  }
  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
      header {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / span 4;
        grid-auto-flow: dense;
        grid-template-rows: min-content;
      }
    mu-form {
      display: contents;
    }
    nav {
      grid-column: auto / -1;
      text-align: right;
    }
    h2 {
      grid-column: 1 / span 3;
    }
    p {
      grid-column: 2 / -1;
    }
    img.hero {
      grid-column: auto / span 4;
    }
    input {
     margin: var(--size-spacing-medium) 0;
     font: inherit;
    }
    dl {
      display: grid;
      grid-column: 1 / span 4;
      grid-template-columns: subgrid;
      align-items: baseline;
    }
    dt {
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: span 3 / -1;
    }
    `
  ];

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
      this.dispatchMessage([
        "tour/select",
        { tourid: newValue }
      ]);
    }
  }

  // Auth for image upload
  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");
  _user?: Auth.User;

  override connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
    });
  }

  get authorization(): { Authorization?: string } {
    if (this._user && this._user.authenticated)
      return {
        Authorization:
          `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
      };
    else return {};
  }

  handleSubmit(src: string, formData: object) {
    console.log("Submitting form", formData);
    const json: object = {
      ...this.destination,
      ...formData
    };

    if ( this._image )
      (json as Destination).featuredImage = this._image

    fetch( src, {
      headers: {
        "Content-Type": "application/json",
        ...this.authorization
      },
      method: "PUT",
      body: JSON.stringify(json)
    })
      .then(res => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        else return res.json()
      })
      .then((json: unknown) => {
        this.destination = convertStartEndDates<Destination>(json);
        this.mode = "view";
      })
  }

  @state()
  _image?: string;

  handleImageSelected(files: FileList) {
    if (files && files.length) {
      const reader = new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = (err) => reject(err);
        fr.readAsArrayBuffer(files[0]);
      });

      reader.then((buffer) => {
        const { name, size, type } = files[0];
        const query = new URLSearchParams({ filename: name });
        const url = new URL("/images", document.location.origin);
        url.search = query.toString();

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": type,
            "Content-Length": size.toString(),
            ...this.authorization
          },
          body: buffer as ArrayBuffer
        })
          .then((res) => {
            if (res.status === 201) return res.json();
            else throw res.status;
          })
          .then((json: { url: string } | undefined) => {
            if (json) {
              console.log("Image has been uploaded to", json.url);
              this._image = json.url;
            } else throw "No JSON response";
          })
          .catch((error) => {
            console.log("Upload failed", error);
          });
      });
    }
  }
}
