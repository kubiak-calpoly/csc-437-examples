// module Kram_6365ca69_state (ES6)
          
          console.log('Loading module "Kram_6365ca69_state"');
          function Program ({connectStore, initializeStore}) {
            // JS Definition from scene 1
class ObservableElement extends HTMLElement {
  constructor(template, model) {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.cloneNode(true)
    );
    this._model = createObservable(model, this);
  }

  get model() {
    return this._model;
  }

  observe(prop) {
    return new Observer(this, prop);
  }

  attach(listener) {
    this.addEventListener("observable:change", listener);
    return listener;
  }

  detach(listener) {
    this.removeEventListener("observable:change", listener);
  }
}

// JS Definition from scene 2
class Travelers extends ObservableElement {
  constructor() {
    super(Travelers.html_template, { count: 2 });
    this.onchange = this.handleChange.bind(this);
  }

  connectedCallback() {
    const countInput = this.querySelector("input");

    if (countInput) {
      countInput.value = this.model.count.toString();
    }
  }

  handleChange(event) {
    this.model.count = parseInt(event.target.value);
  }

  static html_template = template`<form>
    <slot></slot>
  </form>`;
}

customElements.define("travelers-form", Travelers);

// JS Definition from scene 3
class Schedule extends ObservableElement {
  constructor() {
    super(Schedule.html_template, Schedule.init());
    this.onchange = this.handleChange.bind(this);
  }

  static init() {
    const duration = 7;
    const firstDate = new Date();
    const lastDate = new Date(
      firstDate.getTime() + duration * this.msPerDay
    );

    return {
      first: firstDate.toISOString().substring(0, 10),
      last: lastDate.toISOString().substring(0, 10)
    };
  }

  connectedCallback() {
    const firstInput = this.querySelector(
      'input[name="first-date"]'
    );
    const lastInput = this.querySelector(
      'input[name="last-date"]'
    );

    if (firstInput) {
      firstInput.value = this.model.first;
    }

    if (lastInput) {
      lastInput.value = this.model.last;
    }
  }

  handleChange(event) {
    switch (event.target.name) {
      case "first-date":
        this.model.first = event.target.value;
        return;
      case "last-date":
        this.model.last = event.target.value;
        return;
    }
  }

  static firstDate({ first }) {
    return new Date(first);
  }

  static lastDate({ last }) {
    return new Date(last);
  }

  static days({ first, last }) {
    return this.daysBetween(first, last) + 1;
  }

  static nights({ first, last }) {
    return this.daysBetween(first, last);
  }

  static daysBetween(first, last) {
    const firstDate = new Date(first);
    const lastDate = new Date(last);

    return Math.ceil(
      (lastDate - firstDate) / Schedule.msPerDay
    );
  }

  static msPerDay = 1000 * 60 * 60 * 24;

  static html_template = template`<form>
    <slot></slot>
  </form>`;
}

customElements.define("schedule-form", Schedule);

// JS Definition from scene 4
class Observer {
  constructor(observable, prop) {
    this._observable = observable;
    this._accessor = prop
      ? (model) => model[prop]
      : (model) => model;
    this._listeners = [];
  }

  get value() {
    return this._accessor(this._observable.model);
  }

  thenUpdate(update) {
    this._listeners.push(
      this._observable.attach((ev) => update(this.value, ev))
    );
    update(this.value);
    return this;
  }

  detach() {
    this._listeners.forEach((listener) =>
      observable.detach(listener)
    );
  }
}

// JS Definition from scene 4
class ObserverElement extends HTMLElement {
  constructor(template, model) {
    super();
    this.model = model;
    this.attachShadow({ mode: "open" }).appendChild(
      template.cloneNode(true)
    );
    this._observers = [];
  }

  disconnectedCallback() {
    this._observers.forEach((obs) => obs.detach());
  }

  observe(observable, prop) {
    const observer = observable.observe(prop);
    this._observers.push(observer);
    return observer;
  }
}

// JS Definition from scene 4
class Invoice extends ObserverElement {
  constructor() {
    super(Invoice.html_template, Invoice.init());
  }

  static init() {
    return {
      rate: 200,
      currency: "€",
      rooms: 1,
      nights: 7
    };
  }

  connectedCallback() {
    const rateSpan =
      this.shadowRoot.getElementById("room-rate");
    rateSpan.textContent = `${this.model.rate.toString()} ${
      this.model.currency
    }`;

    this.observe(
      this.getObservable("travelers"),
      "count"
    ).thenUpdate((count) => this.updateGuests(count));

    this.observe(this.getObservable("schedule")).thenUpdate(
      (schedule) => this.updateNights(Schedule.nights(schedule))
    );
  }

  getObservable(name) {
    const selector = this.getAttribute(name);
    return document.querySelector(selector);
  }

  updateGuests(guests) {
    const rooms = Math.ceil(guests / 2);
    const roomSpan =
      this.shadowRoot.getElementById("room-count");

    roomSpan.textContent = rooms.toString();
    this.model.rooms = rooms;
    this.updateTotal();
  }

  updateNights(nights) {
    const nightSpan =
      this.shadowRoot.getElementById("night-count");
    nightSpan.textContent = nights.toString();
    this.model.nights = nights;
    this.updateTotal();
  }

  updateTotal() {
    const totalSpan =
      this.shadowRoot.getElementById("total-charge");
    const total =
      this.model.rate * this.model.rooms * this.model.nights;
    totalSpan.textContent = `${total.toString()} ${
      this.model.currency
    }`;
  }

  static html_template = document.getElementById(
    "invoice-template"
  ).content;
}

customElements.define("invoice-observer", Invoice);

// JS Definition from scene 5
function createObservable(root, eventTarget) {
  const OBSERVABLE_CHANGE_EVENT = "observable:change";

  console.log("creating Observable:", JSON.stringify(root));

  let proxy = new Proxy(root, {
    get: (target, prop, receiver) => {
      if (prop === "then") {
        return undefined;
      }
      const value = Reflect.get(target, prop, receiver);
      console.log(
        `Observable['${prop}'] => ${JSON.stringify(value)}`
      );
      return value;
    },
    set: (target, prop, newValue, receiver) => {
      const oldValue = root[prop];
      console.log(
        `Observable['${prop}'] <= ${JSON.stringify(
          newValue
        )}; was ${JSON.stringify(oldValue)}`
      );
      const didSet = Reflect.set(
        target,
        prop,
        newValue,
        receiver
      );
      if (didSet) {
        let evt = new CustomEvent(OBSERVABLE_CHANGE_EVENT, {
          bubbles: true,
          cancelable: true
        });
        Object.assign(evt, {
          property: prop,
          oldValue,
          value: newValue
        });
        eventTarget.dispatchEvent(evt);
        console.log(
          "dispatched event to target",
          evt,
          eventTarget
        );
      } else {
        console.log(
          `Observable['${prop}] was not set to ${newValue}`
        );
      }
      return didSet;
    }
  });

  return proxy;
}

// JS Definition from scene 6
function template(strings, ...values) {
  const html = strings.flatMap((s, i) =>
    i ? [values[i - 1], s] : [s]
  );
  let tpl = document.createElement("template");
  tpl.innerHTML = html;
  return tpl.content;
}

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
