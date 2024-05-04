import { prepareTemplate } from "./template.js";
import { addFragment } from "./html-loader.js";

export class InputArrayElement extends HTMLElement {
  static template = prepareTemplate(`<template>
    <ul>
      <slot></slot>
    </ul>
    <button class="add" onclick="relayEvent(event,'input-array:add')">
      <slot name="label-add">Add one</slot>
    <style>
      :host {
        display: contents;
      }
      ul {
        display: contents;
      }
      button.add {
        grid-column: input / input-end;
      }
    </style>
    </template>`);

  get name() {
    return this.getAttribute("name");
  }

  get value() {
    return this._array;
  }

  set value(array) {
    this._array = Array.isArray(array) ? array : [array];
    populateArray(this._array, this);
  }

  constructor() {
    super();
    this._array = [];
    this.attachShadow({ mode: "open" }).appendChild(
      InputArrayElement.template.cloneNode(true)
    );
    this.addEventListener("input-array:add", (event) => {
      event.stopPropagation();
      addFragment(renderItem("", this._array.length), this);
    });
    this.addEventListener("input-array:remove", (event) => {
      event.stopPropagation();
      this.removeClosestItem(event.target);
    });
    this.addEventListener("change", (event) => {
      console.log("Change event:", event);
      const target = event.target;

      if (target !== this) {
        event.stopPropagation();
        const newEvent = new Event("change", { bubbles: true });
        const value = target.value;
        const item = target.closest("label");
        const index = Array.from(this.children).indexOf(item);
        this._array[index] = value;
        this.dispatchEvent(newEvent);
      }
    });
  }

  removeClosestItem(element) {
    const item = element.closest("label");
    const index = Array.from(this.children).indexOf(item);
    this._array.splice(index, 1);
    item.remove();
  }
}

customElements.define("input-array", InputArrayElement);

function populateArray(array, container) {
  container.replaceChildren();
  const html = array.map(renderItem).join("");
  addFragment(html, container);
}

function renderItem(value, i) {
  console.log("Rendering item", i);
  const valueAttr =
    value === undefined ? "" : `value="${value}"`;

  return `<label>
    <input ${valueAttr}/>
      <button class="remove" type="button"
        onclick="relayEvent(event,'input-array:remove')">
        Remove
      </button>
    </label>`;
}
