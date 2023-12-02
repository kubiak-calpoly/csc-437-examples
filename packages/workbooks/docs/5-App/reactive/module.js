// module Kram_2d2d545b_reactive (ES6)
          
          console.log('Loading module "Kram_2d2d545b_reactive"')
          export function Program ({connectStore, initializeStore}) {
            // JS Definition from scene 1
class FrpMain extends HTMLElement {
  constructor(
    init = {},
    update = FrpMain.update,
    msgType = {}
  ) {
    super();
    let content = document.getElementById(
      "frp-main-template"
    ).content;
    this.attachShadow({ mode: "open" }).appendChild(
      content.cloneNode(true)
    );
    this._model = createObservable(this, init);
    this._messageType = msgType;
    this._update = update;
    this.dataset["frpMain"] = name;

    console.log("frp-main constructed ", this._model);
  }

  connectedCallback() {}

  // used by descendants to find their main
  static closest(element) {
    return element.closest("[data-frp-main]");
  }

  static whenObservableFrom(element) {
    const available = element.closest("[data-frp-main]");

    if (available) {
      return Promise.resolve({
        model: available.model,
        messageType: available.messageType,
        attach: available.attachObserver.bind(available)
      });
    }

    return new Promise((resolve, reject) => {
      // search for the closest undefined parent
      let candidate = element.closest(":not(:defined)");

      if (candidate) {
        // wait for the blocking element to be defined,
        // and then upgrade it when it is.
        customElements
          .whenDefined(candidate.localName)
          .then(() => {
            if (candidate instanceof FrpMain) {
              resolve({
                model: candidate.model,
                messageType: candidate.messageType,
                attach: candidate.attachObserver.bind(candidate)
              });
            } else {
              // should continue up the tree, but for now, reject.
              reject({
                error: `Found ${candidate.localName}, but it is not FrpMain`,
                candidate
              });
            }
          });
      } else {
        throw "No candidates found for frp-main element";
      }
    });
  }

  attachObserver(update) {
    console.log(
      "Setting up event listener for observer.update",
      this
    );
    this.addEventListener("observable:change", () =>
      update(this.model, this.messageType)
    );
  }

  // main provides the model (readonly)
  get model() {
    return this._model;
  }

  get messageType() {
    return this._messageType;
  }

  bindAction(fn) {
    return new Promise((resolve, reject) => {
      try {
        const action = fn(
          this.dispatch.bind(this),
          this.messageType
        );

        resolve(action);
      } catch (error) {
        reject(error);
      }
    });
  }

  dispatch(action, event) {
    console.log("frp-main: dispatching action", action, event);
    try {
      this._update(action(event), this.model);
    } catch (error) {
      console.log(
        "frp-main: dispatch failed",
        error,
        action,
        event
      );
    }
  }

  // default update function; handles assignment messages
  static update(assignments, model) {
    console.log("frp-main: update", assignments);

    Object.entries(assignments).forEach(([key, value]) => {
      model[key] = value;
    });
    return model;
  }
}

customElements.define("frp-main", FrpMain);

// JS Definition from scene 1
class FrpExample1 extends FrpMain {
  constructor() {
    super(
      { count: 10 },
      FrpExample1.update,
      FrpExample1.MsgType
    );
  }

  static MsgType = {
    Increment: () => ({ Increment: {} }),
    Decrement: () => ({ Decrement: {} })
  };

  static update(message, model) {
    const { count } = model;

    console.log("FrpExample1 update:", message);

    switch (Object.keys(message)[0]) {
      case "Increment":
        return (model.count = count + 1);
      case "Decrement":
        return (model.count = Math.max(0, count - 1));
    }
  }
}

customElements.define("frp-example-1", FrpExample1);

// JS Definition from scene 2
class FrpView extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById(
      "frp-view-template"
    ).content;
    this.attachShadow({ mode: "open" }).appendChild(
      content.cloneNode(true)
    );
    this.dataset["frpView"] = "FrpView";

    console.log("frp-view constructed");
  }

  connectedCallback() {
    this._observing = this.getAttribute("observing");
    this._dispatching = this.getAttribute("dispatching");
    this.observable = FrpMain.whenObservableFrom(this);
  }

  // used by descendants to find their view
  static closest(element) {
    return element.closest("[data-frp-view]");
  }

  get observers() {
    return this._observing || "model";
  }

  get messages() {
    return this._dispatching || "Msg";
  }

  compile(expr, observer = null) {
    // observeFn: model -> Any
    return Function(
      "__model__",
      `const ${this.observers} = __model__ || {};
       return (${expr});`
    ).bind(observer);
  }

  prepare(fnExpr) {
    // actionFn: model -> Msg -> event -> void
    return Function(
      "__model__",
      "__Msg__",
      "__event__",
      `const ${this.observers} = __model__ || {};
       const ${this.messages} = __Msg__ || {};
       return (${fnExpr}).call(this, __event__);`
    );
  }

  observe(fn, observer) {
    const update = (model, msgType) => {
      console.log("Observing function:", fn);
      Promise.resolve(fn(model, msgType))
        .then((value) => observer.update(value))
        .catch((error) => observer.report(error));
    };

    this.observable.then(({ model, messageType, attach }) => {
      attach(update);
      update(model, messageType);
    });
  }
}

customElements.define("frp-view", FrpView);

// JS Definition from scene 3
class FrpExample2 extends FrpMain {
  constructor() {
    super(connectStore().root, FrpExample2.update);
  }
}

customElements.define("frp-example-2", FrpExample2);

// JS Definition from scene 4
class FrpText extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById(
      "frp-text-template"
    ).content;
    this.attachShadow({ mode: "open" }).appendChild(
      content.cloneNode(true)
    );
  }

  connectedCallback() {
    const expr = this.textContent.replaceAll(/[`\\]/g, "\\$&");
    const bq = "`";
    const view = FrpView.closest(this);
    const renderFn = view.compile(`${bq}${expr}${bq}`, this);

    view.observe(renderFn, this);
  }

  update(value) {
    const slot = this.shadowRoot.firstElementChild;
    const span = this.shadowRoot.getElementById("value");

    slot.className = "filled";
    span.innerText = value;
    span.className = `${typeof value}-value`;
  }

  report(error) {
    const span = this.shadowRoot.getElementById("value");

    slot.className = "error";
  }
}

customElements.define("frp-text", FrpText);

// JS Definition from scene 5
class FrpBind extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById(
      "frp-bind-template"
    ).content;
    this.attachShadow({ mode: "open" }).appendChild(
      content.cloneNode(true)
    );
  }

  connectedCallback() {
    const view = FrpView.closest(this);
    const attrNames = this.getAttributeNames();
    const propNames = attrNames.filter(
      (name) => !name.startsWith("on-")
    );
    const eventNames = attrNames
      .filter((name) => name.startsWith("on-"))
      .map((name) => name.substring(3));

    if (propNames) {
      const assignments = propNames
        .map((name) => {
          const expr = this.getAttribute(name);
          return `["${name}", ${expr}]`;
        })
        .join(",\n");
      const mapFn = view.compile(`[${assignments}]`);

      view.observe(mapFn, this);
    }

    const handlerEntries = eventNames.map((type) => {
      const name = `on-${type}`;
      const expr = this.getAttribute(name);
      const actionFn = view.prepare(expr);
      return [type, actionFn];
    });

    this.updateHandlers(handlerEntries);
  }

  update(entries) {
    for (const target of this.children) {
      for (let [name, value] of entries) {
        target[name] = value;
        console.log(`FrpBind: target.${name}:`, value);
      }
    }
  }

  updateHandlers(handlerEntries) {
    const main = FrpMain.closest(this);
    const dispatch = main.dispatch.bind(main);

    for (const target of this.children) {
      handlerEntries.forEach(([type, fn]) => {
        const name = `on${type}`;
        const action = fn.bind(
          target,
          main.model,
          main.messageType
        );
        target[name] = (event) => dispatch(action, event);
        console.log(`FrpBind: target.${name}:`, fn);
      });
    }
  }

  report(reason) {
    const slot = this.shadowRoot.firstElementChild;

    slot.className = "error";
  }
}

customElements.define("frp-bind", FrpBind);

// JS Definition from scene 6
function createObservable(eventTarget, root) {
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