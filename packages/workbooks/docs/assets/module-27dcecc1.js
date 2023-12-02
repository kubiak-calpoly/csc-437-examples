// module Kram_e2bdb492_webc (ES6)
          
          console.log('Loading module "Kram_e2bdb492_webc"');
          function Program ({connectStore, initializeStore}) {
            // JS Definition from scene 1
class HelloWorldElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("hello-world-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }
}

customElements.define("hello-world", HelloWorldElement);

// JS Definition from scene 3
class HelloStyleElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("hello-style-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }
}

customElements.define("hello-style", HelloStyleElement);

// JS Definition from scene 4
class GreetWorldElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("greet-world-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }
}

customElements.define("greet-world", GreetWorldElement);

// JS Definition from scene 5
class ArrowButtonElement extends HTMLElement {
  static get observedAttributes() {
    return ["heading"];
  }

  constructor() {
    super();
    let content = document.getElementById("arrow-button-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }

  connectedCallback() {
    const heading = this.getAttribute("heading");

    if (heading) {
      this._updateRotation(heading);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "heading") {
      this._updateRotation(newValue);
    }
  }

  _updateRotation(heading) {
    const button = this.shadowRoot.firstElementChild;
    button.style.setProperty("--arrow-rotation", heading);
  }
}

customElements.define("arrow-button", ArrowButtonElement);

// JS Definition from scene 6
class V1DropdownElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("dropdown-menu-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
    this.isShownInput = this.shadowRoot.getElementById("is-shown");

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
      document.removeEventListener("click", this.clickawayHandler);
    }
  }
}

customElements.define("dropdown-menu", V1DropdownElement);

// JS Definition from scene 8
class DropdownBaseElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("dropdown-base-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
    this.isShownInput = this.shadowRoot.getElementById("is-shown");

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
      document.removeEventListener("click", this.clickawayHandler);
    }
  }
}

customElements.define("dropdown-base", DropdownBaseElement);

// JS Definition from scene 9
class CommandMenuElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("command-menu-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }
}

class CommandGroupElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("command-group-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }
}

customElements.define("command-menu", CommandMenuElement);
customElements.define("command-group", CommandGroupElement);

// JS Definition from scene 10
class ActionItemElement extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("action-item-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }
}

customElements.define("action-item", ActionItemElement);

            return ({
              
            })
          }
          function mount (mountpoint, initial) {
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
            const program = Program({connectStore});
            return (n, container) => {
              program[n-1].call(container);
            }
          }

export { Program, mount };
