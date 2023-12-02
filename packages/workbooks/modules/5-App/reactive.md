---
title: Reactive Programming with Components
platform: web-standard
model:
  who_am_i: Reactive Programming
  author: The Unbundled Dev
  copyright_year: 2023
  page_views: 9999
  toolbox:
    available:
      - Rectangle
      - Triangle
      - Circle
      - Polygon
      - Line
      - Path
      - Text
    selected: Rectangle
    current_index: 0
  features:
    fp-moorea:
      feature_name: Moorea
      feature_type: island
      country: French Polynesia
      currency:
        full_name: French Polynesian Franc
        abbrev: FRP
      budget:
        hotel_nightly: 100
        breakfast: 10
        lunch: 20
        dinner: 40
      climate: tropical
      ratings:
        star_1: 0
        star_2: 1
        star_3: 5
        star_4: 30
        star_5: 95
---

# Functional Reactive Programming

```html
<frp-example-1>
  <frp-view>
    <frp-bind on-click="Msg.Decrement">
      <button>Less cowbell</button>
    </frp-bind>
    <p>
      <frp-text>The sound of ${model.count} cowbells.</frp-text>
    </p>
    <frp-bind on-click="Msg.Increment">
      <button>More cowbell</button>
    </frp-bind>
  </frp-view>
</frp-example-1>
```

While the Observer pattern shows us how all of the copies
(observers) can stay in sync with the main (observable) data,
it doesn't tell us where to store the data.
If two components need the same piece of data, which one is
the observer and which is the observable?
Or, should they both be observers?
In which case, where is the observable data stored?

Every application has to consider these questions.
In general, data can be needed anywhere in an application,
and so whatever methodology we choose must be applied at the
application level.
We can't have part of our program doing it one way and part
doing it another way, because invariably they will need to
share access to some piece of data.

This all leads us to the strategy called Functional
Reactive Programming (FRP).
Where there is some level of debate over what aspects of FRP are
essential, we'll present something of a middle ground.
For the purposes of this chapter, we'll take FRP to have
the following four axioms as requirements:

1. All observable data, called the _model_, is maintained
   at the root of the application in a hierarchical _store_.

2. All UI presentation, or _views_ only depend on data in the _store_.
   That is, the views are _stateless_ and can be expressed as _pure functions_
   whose input is the _model_.

3. All mutations to the _store_ are performed by invoking an _update_ function.
   A queue of _actions_ is usually employed to guarantee the calls to _update_ are
   serial and ordered.

4. Every observer is responsible for updating any portion of
   the UI which is dependent on that particular observation of the model.
   The Observer pattern can be used to ensure all observers are notified
   whenever the model data they observed is mutated.
   Note that since all views are functions of the model, one alternative
   to multiple low-level observer updates is to recalculate
   the view whenever the model changes.

```js
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
```

```js
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
```

```html
<template id="frp-main-template">
  <section id="frp-main">
    <slot></slot>
  </section>
</template>
```

---

## View watches for changes to values it needs

```js
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
```

```html
<template id="frp-view-template">
  <slot></slot>
</template>
```

---

## Exposing parts of a model to a view

```html
<frp-example-2>
  <frp-view observing="{copyright_year, author, page_views}">
    <p>
      <frp-text
        >&copy; Copyright ${copyright_year} by
        ${author}.</frp-text
      >
    </p>
    <p>
      <frp-text
        >This page has been viewed ${page_views}
        times.</frp-text
      >
    </p>
  </frp-view>
  <frp-view>
    <p>
      <frp-bind
        on-click="() => ({page_views: model.page_views+1})"
      >
        <button>Increment View Counter</button>
      </frp-bind>
    </p>
    <p>
      <frp-bind
        value="model.author"
        on-change="() => ({author: this.value})"
      >
        <input />
      </frp-bind>
    </p>
  </frp-view>
</frp-example-2>
```

The basis of reactive programming is that all side-effects are sent to
data store which is provided by the root element of the UI.
To the rest of the code, the store is read-only.

> Programming with, or designing upon, asynchronous data streams

> The essence of functional reactive programming is to specify the
> dynamic behavior of a value completely at the time of declaration.

Components may get values from the store, and also listen for change events.

This is not easy to do. The problem of keeping the DOM in sync with data stored in Javascript
has given rise to multiple competing frameworks; client-side rendering; a proposed extension to JS to add HTML expressions;
and ultimately the idea that Javascript, not HTML, is the lingua franca of the web.

The difficulty here is that HTML provides very few hooks to attach Javascript to elements.
Unless the element was created by JS in the browser,
the only way to get a JS handle for an element
is by querying the DOM.
This introduces dependencies between the HTML and Javascript,
making it difficult to change either.
HTML custom elements address this difficulty,
because they allow us attach Javascript functionality to elements.

Typically, we have a record of data, and a chunk of HTML that presents the data.
What we want is a way, _from HTML_, to say "put this piece of data here".

So let's define two components: one that lets us identify a set of data we want to present,
and one to indicate where to insert each piece.

```js
class FrpExample2 extends FrpMain {
  constructor() {
    super(connectStore().root, FrpExample2.update);
  }
}

customElements.define("frp-example-2", FrpExample2);
```

---

```js
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
```

```html
<template id="frp-text-template">
  <slot>Use template literal syntax here.</slot>
  <span id="value" class="undefined-value"></span
  ><style>
    span.undefined-value,
    slot.filled {
      display: none;
    }

    span.error-value,
    slot.error {
      background: red;
      color: white;
    }
  </style></template
>
```

---

## Binding element properties and event handlers

```js
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
```

```html
<template id="frp-bind-template">
  <slot></slot>
</template>
```

---

## Under the Hood: Proxies implement Observable

```js
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
```
