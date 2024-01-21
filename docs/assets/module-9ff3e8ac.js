// module Kram_a9f90145_itinerary (ES6)
          
          console.log('Loading module "Kram_a9f90145_itinerary"');
          function Program ({connectStore, initializeStore}) {
            // JS Definition from scene 1
class BlzAccommodation extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("blz-accommodation-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }
}

customElements.define("blz-accommodation", BlzAccommodation);

// JS Definition from scene 2
class BlzDestination extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("blz-destination-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }
}

customElements.define("blz-destination", BlzDestination);

// JS Definition from scene 3
class BlzExcursion extends HTMLElement {
  constructor() {
    super();
    const content = document.getElementById("blz-excursion-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }

  connectedCallback() {
    const type = this.getAttribute("type");

    if (type) {
      this._updateMessage(type);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "type") {
      this._updateMessage(newValue);
    }
  }

  _updateMessage(type) {
    let message = this.shadowRoot.getElementById("message");
    let place = this.shadowRoot.getElementById("place");

    switch (type) {
      case "bus":
        message.replaceChildren("Take a city bus to ", place);
        break;
      case "metro":
        message.replaceChildren("Travel to ", place, " via Metro");
        break;
      case "train":
        message.replaceChildren(place, " by train");
        break;
      case "walking":
        message.replaceChildren("Tour ", place, " on foot");
        break;
      default:
        message.replaceChildren("Visit ", place);
        break;
    }
  }
}

customElements.define("blz-excursion", BlzExcursion);

// JS Definition from scene 4
class BlzItinerary extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("blz-itinerary-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }
}

customElements.define("blz-itinerary", BlzItinerary);

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
