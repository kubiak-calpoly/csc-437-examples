"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var itinerary_item_exports = {};
__export(itinerary_item_exports, {
  ItineraryItem: () => ItineraryItem
});
module.exports = __toCommonJS(itinerary_item_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_css_base = require("../shared/css-base");
let ItineraryItem = class extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.startDate = /* @__PURE__ */ new Date();
    this.endDate = /* @__PURE__ */ new Date();
    this.itemClass = "transportation";
    this.marker = "";
    this.open = false;
    this.hidden = false;
  }
  render() {
    return import_lit.html` <span id="dates">
        <time datetime=${this.startDate}>
          ${formatDate(this.startDate)}
        </time>
        ${this.endDate && this.endDate > this.startDate ? import_lit.html`
              <time datetime=${this.endDate}>
                ${formatDate(this.endDate)}
              </time>
            ` : null}
      </span>
      <details
        id="details"
        name="itin"
        ${open}
        ontoggle="ItineraryItem.handleToggle(event)">
        <summary>
          <slot name="summary"></slot>
        </summary>
        <slot></slot>
      </details>`;
  }
};
ItineraryItem.styles = [
  import_css_base.reset,
  import_css_base.elements,
  import_lit.css`
      :host {
        display: contents;
      }
      :host([hidden]) {
        display: none;
      }
      #dates {
        color: var(--color-accent);
        font-family: var(--font-family-display);
        font-weight: bold;
        grid-column: start;
      }
      #dates time {
        white-space: nowrap;
      }
      #dates time + time::before {
        display: inline-block;
        content: " – ";
      }
      details {
        padding: var(--size-spacing-medium);
        display: contents;
      }
      details.destination > summary,
      details.destination > ::slotted(*) {
        grid-column: header;
      }
      ::slotted(ul) {
        list-style: none;
        padding: 0;
        align-self: end;
      }
      summary {
        position: relative;
        padding-bottom: var(--size-spacing-large);
        padding-left: calc(
          var(--size-icon-large) + var(--size-spacing-medium)
        );
        list-style: none;
        grid-column: header / end;
        min-height: calc(
          var(--size-icon-large) + var(--size-spacing-large)
        );
      }
      details > summary::before {
        content: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" fill="rgb(42 143 42)"><path d="m624 300h-48v336h-134.88l158.88 317.64 158.88-317.64h-134.88zm-24 546.36-81.121-162.36h162.24z"/></svg>');
        position: absolute;
        height: 2rem;
        width: 2rem;
        bottom: 0;
        right: 0;
        color: var(--color-accent);
        transform: rotate(0);
        transition: transform 0.5s;
      }
      details[open] > summary::before {
        transform: rotate(180deg);
      }
    `
];
__decorateClass([
  (0, import_decorators.property)()
], ItineraryItem.prototype, "startDate", 2);
__decorateClass([
  (0, import_decorators.property)()
], ItineraryItem.prototype, "endDate", 2);
__decorateClass([
  (0, import_decorators.property)({ attribute: "item-class" })
], ItineraryItem.prototype, "itemClass", 2);
__decorateClass([
  (0, import_decorators.property)()
], ItineraryItem.prototype, "marker", 2);
__decorateClass([
  (0, import_decorators.property)({ reflect: true, type: Boolean })
], ItineraryItem.prototype, "open", 2);
__decorateClass([
  (0, import_decorators.property)({ reflect: true, type: Boolean })
], ItineraryItem.prototype, "hidden", 2);
ItineraryItem = __decorateClass([
  (0, import_decorators.customElement)("itinerary-item")
], ItineraryItem);
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function formatDate(dt) {
  const m = months[dt.getUTCMonth()];
  const d = dt.getUTCDate();
  return `${d} ${m}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItineraryItem
});
//# sourceMappingURL=itinerary-item.js.map
