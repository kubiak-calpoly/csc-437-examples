import {
  css,
  define,
  html,
  shadow
} from "@unbndl/html";
import {
  View,
  createView,
  createViewModel,
  fromAttributes,
} from "@unbndl/view";
import {
  fromAuth
} from "@unbndl/auth";
import {
  Store,
  fromStore
} from "@unbndl/store";
import { BrowserHistory } from "@unbndl/switch";
import { Model } from "../model.ts";
import { Msg } from "../messages.ts";
import reset from "../styles/reset.css.ts";
import headings from "../styles/headings.css.ts";
import { Traveler } from "server/models";
import { InputArrayElement } from "../components/input-array.ts";

type ProfileMode = "view" | "edit" | "new";

type ProfileViewAttributes = {
  mode?: string;
  "user-id"?: string
};

interface ProfileViewModel {
  mode: ProfileMode;
  userid?: string;
  profile?: Traveler;
  username?: string | undefined;
  token?: string | undefined;
  _avatar?: string;
  _error?: Error;
}

export class ProfileViewElement extends HTMLElement {
  static {
    define({
      "input-array": InputArrayElement
    });
  }

  viewModel = createViewModel<ProfileViewModel>({
    mode: "view" as ProfileMode
  })
    .withRenamed(
      fromAttributes<ProfileViewAttributes>(this), {
      userid: "user-id", mode: "mode"
    })
    .with(fromAuth(this), "username")
    .with(fromStore<Model>(this), "profile")
    ;

  dispatch(msg: Msg) {
    Store.dispatch<Msg>(this, msg);
  }

  navigateToMode(mode: ProfileMode) {
    const userid = this.viewModel.$.userid
    BrowserHistory.dispatch(this, "history/navigate", {
      href: `/app/profile/${userid}?mode=${mode}`
    });
  }

  constructor() {
    super();
    shadow(this)
      .styles(
        reset.styles,
        headings.styles,
        ProfileViewElement.styles
      )
      .replace(this.viewModel.render(this.view))
      .delegate("#edit-mode", {
        click: () => this.navigateToMode("edit")
      })
      .delegate("#cancel", {
        click: () => this.navigateToMode("view")
      })
      .delegate('input[name="avatar"]', {
        change: (e: InputEvent) => {
          const target = e.target as HTMLInputElement;
          const files = target.files;
          if (files && files.length)
            this.readAvatarBase64(files);
        }
      })
      .listen({
        submit: (ev: Event) => this.submitForm(ev)
      });

    this.viewModel.createEffect(($) => {
      if ($.userid) this.dispatch(
        ["profile/request", { userid: $.userid }]
      );
    });
  }

  view = createView<ProfileViewModel>(html`
    <section>
      ${($) => $._error
        ? html`<p class="error">${$._error.message}</p>`
        : ""}
      ${($) => $.profile
        ? View.apply(
          $.mode === "view" ? this.mainView : this.editView,
          $.profile)
        : ""}
    </section>
  `);

  mainView = createView<Traveler>(html`
    ${($) =>
      $.userid === this.viewModel.get("username")
        ? html`
            <button id="edit-mode">Edit</button>
          `
        : ""}
    ${($) =>
      $.avatar
        ? html`
            <img src=${$.avatar} alt=${$.name} />
          `
        : ""}
    <h1>${($) => $.name}</h1>
    <dl>
      <dt>Username</dt>
      <dd>${($) => $.userid}</dd>
      <dt>Nickname</dt>
      <dd>${($) => $.nickname || ""}</dd>
      <dt>Home City</dt>
      <dd>${($) => $.home}</dd>
      <dt>Airports</dt>
      <dd>${($) => $.airports.join(", ")}</dd>
      <dt>Favorite Color</dt>
      <dd>
        ${($) =>
          $.color
            ? html`
                <span
                  class="swatch"
                  style=${`background: ${$.color}`}></span>
                <span>${$.color}</span>
              `
            : ""}
      </dd>
    </dl>
  `);

  editView = createView<Traveler>(html`
    <form>
    ${($) =>
      $.avatar
        ? html`
            <img src=${$.avatar}/>
          `
        : ""}
      <h1>
        <span class="aria-only" name="name-label">Display Name</span>
        <input name="fullname"
          value=${($) => $.name}
          aria-labelled-by="name-label"/>
      </h1>
      <dl>
        <dt id="userid-label">Username</dt>
        <dd>
            <input disabled name="userid"
              value=${($) => $.userid}
              aria-labelled-by="userid-label"/>
        </dd>
        <dt id="nickname-label">Nickname</dt>
        <dd>
            <input name="nickname"
              value=${($) => $.nickname || ""}
              aria-labelled-by="nickname-label"/>
        </dd>
        <dt id="home-label">Home City</dt>
        <dd>
            <input name="home"
              value=${($) => $.home || ""}
              aria-labelled-by="home-label"/>
        </dd>
        <dt id="airports-label">Airports</dt>
        <dd>
          <input name="airports"
            value=${($) => $.airports.join(", ")}
            aria-labelled-by="airports-label" />
        </dd>
        <dt id="color-label">Favorite Color</dt>
        <dd>
        ${($) =>
          $.color
            ? html`
                <span
                  class="swatch"
                  style=${`background: ${$.color}`}></span>
                <span>
                  <input
                    type="color"
                    name="color"
                    value=${$.color}
                    aria-labelled-by="color-label" />
                </span>
              `
            : ""}
        </dd>
        <dt id="avatar-label">Upload Profile Image</dt>
        <dd>
            <input type="file" name="avatar"
              aria-labelled-by="avatar-label"/>
        </dd>
      </dl>
      <button id="cancel" type="button">Cancel</button>
      <button type="submit">Save</button>
     </form>
  `);

  static styles = css`
    :host {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: subgrid;
    }
    section {
      display: grid;
      grid-template-columns: subgrid;
      gap: inherit;
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
      grid-column: 1 / -1;
    }
    .error {
      grid-column: 1/-1;
      grid-row: 1;
      border: 3px dashed;
      color: var(--color-error);
      text-align: center;
      font-style: italic;
      padding: var(--size-spacing-medium);
    }
    button {
      grid-row: 2;
    }
    #edit-mode {
      grid-column: 3;
    }
    h1 {
      grid-row: 5;
      grid-column: auto / span 6;
    }
    img {
      display: block;
      grid-column: auto / span 2;
      grid-row: 2 / span 4;
    }
    .swatch {
      display: inline-block;
      width: 2em;
      aspect-ratio: 1;
      vertical-align: middle;
    }
    dl {
      display: grid;
      grid-column: 1 / -1;
      grid-row: 6 / auto;
      grid-template-columns: subgrid;
      align-items: baseline;
    }
    dt {
      grid-column: 1 / span 2;
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: 3 / -1;
    }
    form {
      display: contents;
    }
    input {
      margin: var(--size-spacing-medium) 0;
      font: inherit;
    }
    .aria-only {
      position: absolute;
        height: 0;
        width: 0;
        overflow: hidden;
        left: -9999px;
    }
  `;

  submitForm(ev: Event) {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;
    const json: Partial<Traveler> = this.formDataToJSON(form);
    const userid = this.viewModel.$.userid;

    if (userid)
      this.dispatch([
        "profile/save",
        { userid, profile: json },
        {
          onSuccess: () => this.navigateToMode("view"),
          onFailure: (error: Error) => {
            this.viewModel.set("_error", error)
          }
        }
      ]);
  }

  formDataToJSON(form: HTMLFormElement): Partial<Traveler> {
    const inputs = Array.from(form.elements).filter(
      (el) => "name" in el
    ) as Array<HTMLInputElement>;

    const entries = inputs.map((el) => {
      const k = el.name;
      switch (k) {
        case "avatar":
          return [k, this.viewModel.get("_avatar")];
        default:
          return [k, el.value];
      }
    });

    // console.log("Entries:", entries);
    return Object.fromEntries(entries);
  }

  readAvatarBase64(files: FileList) {
    if (files && files.length) {
      const reader = new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = (err) => reject(err);
        fr.readAsDataURL(files[0]);
      });

      reader.then((result: unknown) => {
        this.viewModel.set("_avatar", result as string);
      });
    }
  }
}
