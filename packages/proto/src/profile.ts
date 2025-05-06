import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Traveler } from "./models/traveler.ts";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";

export class ProfileElement extends LitElement {
  @property()
  src?: string;

  @state()
  traveler?: Traveler;

  render() {
    const {
      userid,
      name,
      nickname,
      home,
      airports = [],
      avatar,
      color
    } = this.traveler || {};

    return html`
      <img src=${avatar} alt=${name} />
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
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: #${color}"></span>
          </slot>
          <slot name="color-name">#${color}</slot>
        </dd>
      </dl>
      </section>
      </template>`;
  }

  static styles = [
    reset.styles,
    headings.styles,
    css`
    :host {
      display: contents;
      grid-column: 2/-2;
    }
    section {
      display: grid;
      grid-template-columns: subgrid;
      gap: inherit;
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
      grid-column: 1 / -1;
    }
    h1 {
      grid-row: 4;
      grid-column: auto / span 2;
    }
    img {
      display: block;
      grid-column: auto / span 2;
      grid-row: 1 / span 4;
    }
    .swatch {
      display: inline-block;
      width: 2em;
      aspect-ratio: 1;
      vertical-align: middle;
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
  `];

  override attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue:string
  ){
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === "src" && oldValue !== newValue && newValue)
      this.hydrate(newValue);
  }

  hydrate(url: string) {
    fetch(url)
      .then((res: Response) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json: unknown) =>
        this.traveler = json as Traveler
      )
      .catch((error) =>
        console.log(`Failed to render data ${url}:`, error)
      );
  }
}


