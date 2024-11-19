import {
  define,
  Form,
  InputArray,
  View
} from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Traveler } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

export class TravelerViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });

  @property()
  userid?: string;

  @property({ reflect: true })
  mode = "view";

  @state()
  get profile(): Traveler | undefined {
    return this.model.profile;
  }

  render() {
    const {
      userid,
      name,
      nickname,
      home,
      airports = [],
      avatar,
      color = "ffffff"
    } = this.profile || {};

    return html`
      <main class="page">
      <section class="view">
        <img src=${avatar}/>
        <button id="edit"
          @click=${() => (this.mode = "edit")}
        >Edit</button>
        <h1>${name}</h1>
        <dl>
          <dt>Username</dt>
          <dd>${userid}</dd>
          <dt>Nickname</dt>
          <dd>${nickname}</dd>
          <dt>Home City</dt>
          <dd>${home}</dd>
          <dt>Airports</dt>
          <dd>${airports.join(", ")}</dd>
          <dt>Favorite Color</dt>
          <dd>
              <span
                class="swatch"
                style="background: #${color}"></span>
            </slot>
            <slot name="color-name">#${color}</slot>
          </dd>
        </dl>
      </section>
      <mu-form class="edit" .init=${this.profile}>
        <label>
          <span>Username</span>
          <input name="userid" />
        </label>
        <label>
          <span>Avatar</span>
          <input type="file" name="_avatar" />
        </label>
        <label>
          <span>Name</span>
          <input name="name" />
        </label>
        <label>
          <span>Nickname</span>
          <input name="nickname" />
        </label>
        <label>
          <span>Home City</span>
          <input name="home" />
        </label>
        <label>
          <span>Airports</span>
          <input-array name="airports">
            <span slot="label-add">Add an airport</span>
          </input-array>
        </label>
        <label>
          <span>Color</span>
          <input type="color" name="color" />
        </label>
      </mu-form>
      </main>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
        grid-column: 2/-2;
      }
      :host([mode="edit"]),
      :host([mode="new"]) {
        --display-view-none: none;
      }
      :host([mode="view"]) {
        --display-editor-none: none;
      }
      .page {
        --page-grids: 12;

        display: grid;
        grid-template-columns:
          [start] repeat(var(--page-grids), 1fr)
          [end];
        gap: var(--size-spacing-large)
          var(--size-spacing-medium);
      }
      section.view {
        display: var(--display-view-none, grid);
        grid-template-columns: subgrid;
        gap: inherit;
        gap: var(--size-spacing-medium)
          var(--size-spacing-xlarge);
        align-items: end;
        grid-column: 1 / -1;
      }
      h1 {
        grid-row: 2;
        grid-column: auto / span 2;
      }
      ::slotted(img[slot="avatar"]) {
        display: block;
        grid-column: auto / span 2;
        grid-row: 1 / span 2;
      }
      .swatch,
      ::slotted([slot="color-swatch"]) {
        display: inline-block;
        width: 2em;
        aspect-ratio: 1;
        vertical-align: middle;
      }
      ::slotted(ul[slot="airports"]) {
        list-style: none;
        padding: 0;
      }
      dl {
        display: grid;
        grid-column: 1 / span 4;
        grid-row: 5 / auto;
        grid-template-columns: subgrid;
        gap: 0 var(--size-spacing-xlarge);
        align-items: baseline;
      }
      dt {
        grid-column: 1 / span 2;
        justify-self: end;
        color: var(--color-accent);
        font-family: var(--font-family-display);
      }
      dd {
        grid-column: 3 / -1;
      }
      mu-form.edit {
        display: var(--display-editor-none, grid);
        grid-column: 1/-1;
        grid-template-columns: subgrid;
      }
    `
  ];

  constructor() {
    super("blazing:model");
  }

  attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ) {
    super.attributeChangedCallback(name, old, value);

    if (name === "userid" && old !== value && value)
      this.dispatchMessage([
        "profile/select",
        { userid: value }
      ]);
  }
}
