import { css, define, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import icon from "./styles/icon.css.js";
import headings from "./styles/headings.css.js";
import { AccommodationElement } from "./accommodation.js";

const dirToClass = {
  in: "arrive",
  out: "depart"
};

const dirToText = {
  in: "Arrive from",
  out: "Depart for"
};

const byToIcon = {
  air: "icon-airplane",
  rail: "icon-train"
};

const XLINK_NS = "http://www.w3.org/1999/xlink";

export class ConnectionElement extends HTMLElement {
  static observedAttributes = ["dir, by"];

  static template = html`
    <template>
      <a href="#">
        <svg class="icon">
          <use
            id="useicon"
            href="/icons/transportation.svg#icon-airplane" />
        </svg>
        <dl>
          <dt>
            <span id="dirtext">Arrive from </span>
            <slot name="name">San Francisco</slot></dt
          >
          <dd
            ><slot name="time"
              ><time datetime="2024-10-14T17:30:00Z">
                Oct 14, 6:30PM
              </time></slot
            ></dd
          >
          <dd><slot name="station">VCE</slot></dd>
        </dl>
      </a>
    </template>
  `;

  static styles = css`
    :host {
      display: contents;
    }

    a {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: auto / span calc(var(--page-grids) / 2);
        grid-template-areas:
          "city stat stat icon"
          "city time time icon";
        align-items: center;
        color: var(--color-link);
        border: 1px solid var(--color-accent);
        font-family: var(--font-family-display);
        text-decoration: none;
    }

    svg.icon {
      grid-area: icon;
      justify-self: end;
    }

    dl {
      display: contents;
    }
    dt {
      grid-area: city;
    }
    dd {
      grid-area: time;
      text-align: center;
    }
    dd + dd {
      grid-area: stat;
    }
  }

  a.depart {
    grid-template-areas:
      "icon stat stat city"
      "icon time time city";

    svg.icon {
      justify-self: start;
    }

    dt {
      justify-self: end;
      text-align: right;
    }
  }`;

  constructor() {
    super();

    shadow(this)
      .template(ConnectionElement.template)
      .styles(
        reset.styles,
        icon.styles,
        headings.styles,
        ConnectionElement.styles
      );

    this._top = this.shadowRoot.firstElementChild;
    this._dirtext = this.shadowRoot.querySelector("#dirtext");
    this._useicon = this.shadowRoot.querySelector("#useicon");
  }

  connectedCallback() {
    const dir = this.getAttribute("dir");
    this._top.classList.add(dirToClass[dir]);
    this._dirtext.textContent = dirToText[dir];

    const by = this.getAttribute("by");
    const icon = byToIcon[by];
    this._useicon.setAttribute(
      "href",
      `/icons/transportation.svg#${icon}`
    );
  }
}

const excursionIcons = {
  boat: "icon-boat",
  bus: "icon-bus",
  metro: "icon-metro",
  train: "icon-train",
  walking: "icon-walk",
  tour: "icon-camera"
};

export class ExcursionElement extends HTMLElement {
  static observedAttributes = ["type"];

  static template = html`<template>
    <li>
      <svg class="icon">
        <use
          id="useicon"
          href="/icons/destination.svg#icon-walk" />
      </svg>
      <span><slot>${name}</slot></span>
    </li>
  </template>`;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      grid-column: auto / span 2;
      background-color: var(--color-background-card);
      padding: var(--size-spacing-medium);
      gap: var(--size-spacing-medium);
    }

    svg.icon {
      --icon-size: var(--size-icon-large);
      color: var(--color-accent);
    }
  `;

  constructor() {
    super();

    shadow(this)
      .template(ExcursionElement.template)
      .styles(
        reset.styles,
        icon.styles,
        headings.styles,
        ExcursionElement.styles
      );

    this._useicon = this.shadowRoot.querySelector("#useicon");
  }

  connectedCallback() {
    const type = this.getAttribute("type");
    const icon = excursionIcons[type];

    this._useicon.setAttribute(
      "href",
      `/icons/destination.svg#${icon}`
    );
  }
}

export class DestinationElement extends HTMLElement {
  static uses = define({
    "blz-accommodation": AccommodationElement,
    "blz-connection": ConnectionElement,
    "blz-excursion": ExcursionElement
  });

  static template = html`<template>
    <header>
      <h2><slot name="name">Venice</slot></h2>
      <p><slot name="nights">4</slot> nights</p>
    </header>
    <slot name="image">
      <img
        src="/images/full/Canal_Grande_Chiesa_della_Salute_e_Dogana_dal_ponte_dell_Accademia.jpg" />
    </slot>
    <slot name="accommodation">
      <blz-accommodation>
        <span slot="name">Locanda San Barnaba</span>
        <time slot="check-in" datetime="2024-10-14"
          >14 Oct</time
        >
        <time slot="check-out" datetime="2024-10-17"
          >17 Oct</time
        >
        <span slot="room-type">2 Queen</span>
        <span slot="persons">4</span>
        <span slot="room-rate">190</span>
        <span slot="currency">€</span>
      </blz-accommodation>
    </slot>
    <ul class="excursions">
      <slot name="excursions"></slot>
    </ul>
    <footer>
      <slot name="arrival">
        <blz-connection dir="in" by="air">
          <span slot="name">San Francisco</span>
          <time slot="time" datetime="2024-10-14T17:30:00Z">
            Oct 14, 6:30PM
          </time>
          <span slot="station">VCE</span>
        </blz-connection>
      </slot>
      <slot name="departure">
        <blz-connection dir="out" by="rail">
          <span slot="name">Florence</span>
          <time slot="time" datetime="2024-10-18T08:25:00Z">
            Oct 18, 9:25PM
          </time>
          <span slot="station">Venezia S. Lucia</span>
        </blz-connection>
      </slot>
    </footer>
  </template>`;

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: subgrid;
      grid-template-areas: inherit;
    }

    header {
      grid-area: hdr;
      background: none;
      color: var(--color-text);
      height: min-content;

      a[href] {
        color: currentColor;
      }
    }

    ::slotted(img) {
      grid-area: img;
    }

    footer {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: subgrid;
      grid-area: ftr;
    }

    .excursions {
      display: grid;
      grid-area: exc;
      grid-template-columns: subgrid;
      list-style: none;
      padding: 0;
      gap: var(--size-spacing-large);
      font-family: var(--font-family-display);
      font-size: var(--size-type-mlarge);
      line-height: var(--font-line-height-display);
    }
  `;

  constructor() {
    super();

    shadow(this)
      .template(DestinationElement.template)
      .styles(
        reset.styles,
        icon.styles,
        headings.styles,
        DestinationElement.styles
      );
  }
}
