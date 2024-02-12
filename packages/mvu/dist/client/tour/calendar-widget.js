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
    this.startDate = Date.now().toString();
    this.endDate = Date.now().toString();
    this.handleChange = (date) => {
    };
  }
  render() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const dates = datesInRange(start, end);
    const renderDate = (d) => {
      const ymd = {
        d: d.getUTCDate(),
        m: d.getUTCMonth() + 1,
        y: d.getUTCFullYear(),
        day: d.getUTCDay()
      };
      const format = ({ y, m, d: d2 }) => [y, m, d2].join("-");
      return import_lit.html`
        <label style="grid-column: ${ymd.day + 1}">
          ${ymd.d}
          <input
            type="radio"
            name="cal"
            @change="this._handleSelection"
            value="${format(ymd)}" />
        </label>
      `;
    };
    return import_lit.html` <section>
      <fieldset
        @change="${(event) => this.handleChange(new Date(event.target?.value))}">
        <h6>Su</h6>
        <h6>Mo</h6>
        <h6>Tu</h6>
        <h6>We</h6>
        <h6>Th</h6>
        <h6>Fr</h6>
        <h6>Sa</h6>
        ${dates.map(renderDate)}
      </fieldset>
      <button id="clear" @click="${() => this.handleChange()}">
        Clear Selection
      </button>
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
__decorateClass([
  (0, import_decorators.property)({ attribute: "start-date" })
], CalendarWidget.prototype, "startDate", 2);
__decorateClass([
  (0, import_decorators.property)({ attribute: "end-date", type: Date })
], CalendarWidget.prototype, "endDate", 2);
__decorateClass([
  (0, import_decorators.property)()
], CalendarWidget.prototype, "handleChange", 2);
CalendarWidget = __decorateClass([
  (0, import_decorators.customElement)("calendar-widget")
], CalendarWidget);
function datesInRange(start, end) {
  const endTime = end ? end.getTime() : start.getTime();
  let result = [];
  let i = new Date(start);
  while (i.getTime() <= endTime) {
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
