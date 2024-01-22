// module Kram_144f7849_webc (ES6)
          import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ref, createRef } from 'lit/directives/ref.js'
          console.log('Loading module "Kram_144f7849_webc"')
          export function Program ({connectStore, initializeStore}) {
            // JS Definition from scene 7
class DropdownBaseElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById(
      "dropdown-base-template"
    ).content;
    this.attachShadow({ mode: "open" }).appendChild(
      content.cloneNode(true)
    );
    this.isShownInput =
      this.shadowRoot.getElementById("is-shown");

    this.clickawayHandler = (ev) => {
      if (!ev.composedPath().includes(this)) {
        this.toggle(false);
      } else {
        ev.stopPropagation();
      }
    };

    this.isShownInput.addEventListener("change", () =>
      this.toggleClickAway(this.isShownInput.checked)
    );
  }

  toggle(open) {
    this.isShownInput.checked = open;
    this.toggleClickAway(open);
  }

  toggleClickAway(open) {
    if (open) {
      document.addEventListener("click", this.clickawayHandler);
    } else {
      document.removeEventListener(
        "click",
        this.clickawayHandler
      );
    }
  }
}

customElements.define("dropdown-base", DropdownBaseElement);

// JS Definition from scene 8
class CommandMenuElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById(
      "command-menu-template"
    ).content;
    this.attachShadow({ mode: "open" }).appendChild(
      content.cloneNode(true)
    );
  }
}

class CommandGroupElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById(
      "command-group-template"
    ).content;
    this.attachShadow({ mode: "open" }).appendChild(
      content.cloneNode(true)
    );
  }
}

customElements.define("command-menu", CommandMenuElement);
customElements.define("command-group", CommandGroupElement);

// JS Definition from scene 9
class ActionItemElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById(
      "action-item-template"
    ).content;
    this.attachShadow({ mode: "open" }).appendChild(
      content.cloneNode(true)
    );
  }
}

customElements.define("action-item", ActionItemElement);

            return ({
              
            })
          }
          export function mount (mountpoint, initial) {
            let Store = {
              root: Object.assign({}, initial),
            };
            const connectStore = (path = ["root"]) => {
              let root = Store;
              path.forEach((key) => root = root[key]);
              return ({
                root,
                get: (key) => root[key],
                set: (key, value) => root[key] = value,
                keys: () => Object.keys(root),
              })};
            const program = Program({connectStore})
            return (n, container) => {
              program[n-1].call(container)
            }
          }