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
var calendar_widget_exports = {};
__export(calendar_widget_exports, {
  CalendarWidget: () => CalendarWidget
});
module.exports = __toCommonJS(calendar_widget_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
let CalendarWidget = class extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.startDate = /* @__PURE__ */ new Date();
    this.endDate = /* @__PURE__ */ new Date();
  }
  render() {
    const dates = datesInRange(start, end);
    const renderDate = (d) => {
      const ymd = {
        d: d.getUTCDate(),
        m: d.getUTCMonth() + 1,
        y: d.getUTCFullYear()
      };
      const format = ({ y, m, d: d2 }) => [y, m, d2].join("-");
      return import_lit.html`
        <label>
          ${ymd.d}
          <input
            type="radio"
            name="cal"
            onchange="CalendarWidget.handleSelection(event)"
            value="${format(ymd)}" />
        </label>
      `;
    };
    return import_lit.html` <section>
      <fieldset id="grid">
        <h6>Su</h6>
        <h6>Mo</h6>
        <h6>Tu</h6>
        <h6>We</h6>
        <h6>Th</h6>
        <h6>Fr</h6>
        <h6>Sa</h6>
      </fieldset>
      <button
        id="clear"
        onclick="CalendarWidget.handleClearSelection(event)">
        Clear Selection
      </button>
      ${dates.map(renderDate)}
    </section>`;
  }
};
CalendarWidget.styles = import_lit.css`
    :host {
      grid-area: calendar;
      padding: 0 var(--size-spacing-medium);
    }

    fieldset {
      display: grid;
      grid-template-columns: repeat(7, 2rem);
      gap: var(--size-spacing-small);
      justify-content: center;
      justify-items: streth;
      border: 0;
    }

    h6 {
      text-align: center;
    }

    label {
      position: relative;
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
      padding: var(--size-spacing-small);
      white-space: nowrap;
      text-align: center;
      color: var(--color-accent);
      font-family: var(--font-family-display);
      z-index: 0;
    }

    input {
      appearance: none;
      background: white;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
    }

    input:checked {
      background: var(--color-accent);
    }

    label:has(input:checked) {
      color: var(--color-link-inverted);
    }

    button {
      display: block;
      margin: 0 auto;
    }
  `;
CalendarWidget.handleClearSelection = effect(function() {
  const current = this.shadowRoot.querySelector("input:checked");
  if (current) {
    const items = document.querySelectorAll(
      ".itinerary > itinerary-item"
    );
    Array.from(items).forEach((el) => {
      el.removeAttribute("hidden");
      el.removeAttribute("open");
    });
    current.checked = false;
  }
});
CalendarWidget.handleSelection = effect(function(ev) {
  const date = new Date(ev.target.value);
  const items = document.querySelectorAll(
    ".itinerary > itinerary-item"
  );
  Array.from(items).forEach((el) => {
    const start2 = el.getAttribute("start-date");
    const end2 = el.getAttribute("end-date") || start2;
    const shown = new Date(start2) <= date && date <= new Date(end2);
    if (shown) {
      el.setAttribute("open", "open");
      el.removeAttribute("hidden");
    } else {
      el.setAttribute("hidden", "hidden");
    }
  });
});
__decorateClass([
  (0, import_decorators.property)({ attribute: "start-date", type: Date })
], CalendarWidget.prototype, "startDate", 2);
__decorateClass([
  (0, import_decorators.property)({ attribute: "end-date", type: Date })
], CalendarWidget.prototype, "endDate", 2);
__decorateClass([
  (0, import_decorators.state)()
], CalendarWidget.prototype, "selected", 2);
CalendarWidget = __decorateClass([
  (0, import_decorators.customElement)("calendar-widget")
], CalendarWidget);
if (window) {
  window.CalendarWidget = CalendarWidget;
}
function datesInRange(start2, end2) {
  let result = [];
  let i = new Date(start2);
  while (i <= (end2 || start2)) {
    result.push(new Date(i));
    i.setUTCDate(i.getUTCDate() + 1);
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CalendarWidget
});
//# sourceMappingURL=calendar-widget.js.map
