const parser = new DOMParser();

function prepareTemplate(htmlString) {
  const doc = parser.parseFromString(htmlString, "text/html");
  const content = doc.head.firstElementChild.content;

  return content;
}

export class DropdownElement extends HTMLElement {
  static template = prepareTemplate(`<template>
    <button id="actuator"> Menu </button>
    <div id="panel">
      <slot></slot>
    </div>
    
    <style>
      :host {
        position: relative;
      }
      #is-shown {
        display: none;
      }
      #panel {
        display: none;
        position: absolute;
        right: 0;
        margin-top: var(--size-spacing-small);
        width: max-content;
        padding: var(--size-spacing-small);
        border-radius: var(--size-radius-small);
        background: var(--color-background-card);
        color: var(--color-text);
        box-shadow: var(--shadow-popover);
      }
      :host([open]) #panel {
        display: block;
      }
    </style>
  </template>`);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      DropdownElement.template.cloneNode(true)
    );
    this.shadowRoot
      .getElementById("actuator")
      .addEventListener("click", () => this.toggle());
  }

  toggle() {
    if (this.hasAttribute("open")) this.removeAttribute("open");
    else this.setAttribute("open", "open");
  }
}

customElements.define("drop-down", DropdownElement);
