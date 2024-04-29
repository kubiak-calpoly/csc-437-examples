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
    console.log("Setting value to", array);
    const oldInputs = this.querySelectorAll(
      `input[name^="${this.name}."] `
    );
    console.log("Inputs were:", oldInputs);
    oldInputs.forEach((input) => {
      const label = input.closest("label");
      label.remove();
    });
    this._array = Array.isArray(array) ? array : [array];
    const html = this._array
      .map((value, i) => renderItem(this.name, i, value))
      .join("");
    addFragment(html, this);
    const newEvent = new Event("change", { bubbles: true });
    this.dispatchEvent(newEvent);
  }

  constructor() {
    super();
    this._array = [];
    this.attachShadow({ mode: "open" }).appendChild(
      InputArrayElement.template.cloneNode(true)
    );
    this.addEventListener("input-array:add", (event) => {
      event.stopPropagation();
      addFragment(
        renderItem(this.name, this._array.length),
        this
      );
    });
    this.addEventListener("input-array:remove", (event) => {
      event.stopPropagation();
      this.removeClosestItem(event.target);
    });
    this.addEventListener("change", (event) => {
      event.stopPropagation();
      console.log("Change event:", event);
      const target = event.target;
      const value = target.value;
      const indexedName = event.target.name;
      const [name, index] = indexedName.split(".");

      if (target !== this && name === this.name) {
        this._array[index] = value;
        const newEvent = new Event("change", { bubbles: true });
        this.dispatchEvent(newEvent);
      }
    });
    this.addEventListener("formdata", (event) => {
      event.preventDefault();
      console.log("FormData event on input-array:", event);
    });
  }

  removeClosestItem(element) {
    const label = element.closest("label");
    const input = label.querySelector("input");
    const name = input.name;
    const [prefix, index] = name.split(".");
    const array = this.value;
    array.splice(index, 1);
    this.value = array;
    label.remove();
  }
}

customElements.define("input-array", InputArrayElement);

function renderItem(name, i, value) {
  console.log("Rendering item", name, i);
  const valueAttr =
    value === undefined ? "" : `value="${value}"`;

  return `<label>
    <input name="${name}.${i}" ${valueAttr}/>
      <button class="remove" type="button"
        onclick="relayEvent(event,'input-array:remove')">
        Remove
      </button>
    </label>`;
}
