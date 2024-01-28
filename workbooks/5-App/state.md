---
title: State Management
platform: web-standard
model:
  count: 10
---

# State Management

```html
<main>
  <h3>Guest Info</h3>
  <travelers-form id="travelers">
    <label>
      Number of guests
      <input type="number" />
    </label>
  </travelers-form>
  <hr />
  <h3>Travel Dates</h3>
  <schedule-form id="schedule">
    <label>
      Check-in on
      <input type="date" name="first-date" />
    </label>
    <label>
      Check-out on
      <input type="date" name="last-date" />
    </label>
  </schedule-form>
  <hr />
  <h3>Invoice</h3>
  <invoice-observer travelers="#travelers" schedule="#schedule">
  </invoice-observer>
</main>
```

Dynamic web pages retrieves data (for example, from an API)
and inserts it into the HTML or DOM.
Originally, the code which rendered data as HTML ran on the server.
Doing so, however, meant that the entire page had to be
reloaded whenever any of the data changes.

To avoid that, developers started using Web APIs
which allow HTML or data to be loaded from the server,
after the page had been completely loaded and rendered.
The first of these APIs was called `XMLHTTPRequest`,
and this technique was often called AJAX, for Asynchronous Javascript and XML.
(At the time, XML was widely used for data APIs,
and XHTML, which cast HTML as strict XML, was promoted as a standard dialect.)

That data may have been formatted server-side as an HTML fragment,
which was simple to splice into the DOM.
But loading the data pre-formatted limited how the data could be used
and the extent to which the user could customize the presentation.
The next development was to serve raw data to the client,
which would use Javascript APIs to build the DOM dynamically.
Web applications written in this way came to be known as _Web 2.0_ to
distinguish them from the earlier static or on-demand
server-generated HTML pages.

When a web application loads data from the server,
it is making a local copy of that data.
This copy becomes part of the application's _state_.
Any processing performed client-side is based on that state.
Each time that part of the state is presented in a UI,
it is again copied and converted to digits or some other format.
As the state is passed to different parts of the UI,
many copies are created, resulting in _local state_.
Some of these copies may be _mutable_, meaning that they can be changed,
often in response to some user interaction.
Additionally, new values may be computed which depend on the state and
would be invalid if the state changes.

This is known as the Application State Management problem.
As state proliferates throughout an application,
it becomes unclear which copy of the data should be trusted.
Or, more colloquially, "Who owns the data?".

Once we decide who owns the data,
we must ensure that all copies of the data are updated
whenever one of them is modified.
This is an example of the Cache Coherency problem,
often cited as one of the
most difficult problems in Computer Science,
right up there with "Naming Things".

Multiple abstractions have been developed for solving this problem,
including Publisher-Subscriber, Immutable Data, and Observer patterns.
Though all are used in various web development frameworks,
we will focus on the Observer pattern, because it can be supported natively
in Javascript through the use of Proxy objects.

In this example, there are two forms which accept input from the user,
and an invoice, the specifics of which depend on the input values.
We've chosen to have each form manage the data that it collects,
while the invoice will observe those values, and update itself
whenever they change.

```js
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
```

---

## Creating an Observable Model

```html
<travelers-form>
  <label> Number of guests <input type="number" /> </label>
</travelers-form>
```

Let's start by looking at the first form.
The traveler details has just one input, for the number of travelers.
So the model for this component contains just a single number,
which we'll call `count`.

We keep the `<input>` value in sync with the model by initializing
the input's value in `connectedCallback` and providing an event
handler for `onchange` events bubbling up from the input.
The event handler is very simple.
There is only one input to generate `onchange` events, so
we just need to set `count` to the target's `value` property.

To make this component's model observable from other components,
we add a `get model()` method.
Notice however that this method does not directly return `this._model`,
but rather `this._observable`, which we initialize by
calling `createObservable` in the constructor.
We will look at this function in detail later,
but for now we can think of `this._observable` as a wrapper
which allows us to update all observers of the model
whenever the `count` property is changed.

```js
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
```

---

## A Slightly More Complex Model

```html
<schedule-form>
  <label>
    Check-in on
    <input type="date" name="first-date" />
  </label>
  <label>
    Check-out on
    <input type="date" name="last-date" />
  </label>
</schedule-form>
```

The second form is more complicated because it has two inputs,
and the model maintains two values, which are dates.
The value of an `<input type="date">` is a string in ISO 8601 format, i.e.,
of the form `YYYY-MM-DD`, and we'll use that format for the model, too.
We also provide some utility functions to convert these strings to
Javascript `Date` objects, or to calculate the number of days
and nights in the range, so that observer components don't need
to implement those operations themselves.

In the constructor, the model is initialized and an
observable is created, which is what we expose via the `get model()` method.
The `value` property of each input is initialized to the
corresponding model property in `connectedCallback`.
We also bind an event handler to capture `onchange` events bubbling up
from the two inputs.

Because this form contains more than one input,
`handleChange` must first determine which input was changed
before it can update the appropriate property of the model.
We reference the `name` attribute of the event target for this
purpose.

```js
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
```

---

## Creating an Observer

```html
<main>
  <travelers-form id="travelers"> </travelers-form>
  <schedule-form id="schedule"> </schedule-form>
  <invoice-observer travelers="#travelers" schedule="#schedule">
  </invoice-observer>
</main>
```

The invoice view has its own model,
which supplies the data required to render the invoice.
Some of the values in this model, such as the room rate,
are managed by the component itself.
But the other values depend on the data which is observable in the
form components we just created.
Whenever those values change, we want the invoice to be updated.
Therefore, our `Invoice` component needs to be an _observer_ of
both `Travelers` and `Schedule`.

The constructor for `Invoice` are similar to what we did for `Travelers` and `Schedule`.
We create a `model` and initialize it.
This model does not need to be observable outside of the `Invoice` class,
so we don't need to create `this._observable` and we don't need the `get model()` method.
Nothing inside this component accepts user input, so there is no need for an `onchange`
handler.

Similarly, `connectedCallback` starts off by rendering the room rate data from the `model`
into the correct location in the `Invoice`'s shadow DOM.
We can use an `id` for this without worrying about conflicts with the light DOM.
Next, we need to render the other data from our model.

But the number of rooms depends on how many guests the user has entered;
the length of stay depends on the users' travel schedule;
and the total depends on the number of rooms, length of stay, and the room rate.
We need to observe the `Travelers` and `Schedule` component models,
and update the `Invoice` model before we can render the shadow DOM.
At the same time that we observe those values,
we will also arrange to update the model and DOM on any future changes.
That is what the `observe` method does,
in concert with the observable models created above.

Our application could potentially have multiple instances of `Travelers` or `Schedule`.
So the first step is to tell the `Invoice` component how to find the observable components.
Rather than hard-wire an `id` into the `class`,
we will pass CSS selector strings into `invoice-observer`
as attribute values and have `observe` use those selectors to locate the observable components.

At this point, we can get the current value of the property we want by indexing
into the component's `model`.
But before we return from `observe`,
we want to make sure that this component gets updated every time
the observed value changes.

The `observe` method is generic.
We could factor it out into a base class to make it easier
to create observer components.
We can't expect `observe` to be able to make the appropriate updates to the model and DOM
for whatever future changes may occur.
Instead, whenever we call `observe`,
and want it to react to future changes in the observed values,
we will also pass a callback function,
which will perform the update.

If a callback function is provided when calling `observe`,
it will be called whenever the value is observed,
being passed the latest observed value.
The first call occurs on the first observation,
before returning from `observe`.
In addition, we can set up an event handler for
`observable:change` events dispatched on the observable component.

```js
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
```

```js
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
```

```js
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
```

```html
<template id="invoice-template">
  <dl>
    <div>
      <dt>Room Rate</dt>
      <dd id="room-rate">199 USD</dd>
    </div>
    <div>
      <dt>#Rooms</dt>
      <dd id="room-count">1</dd>
    </div>
    <div>
      <dt>#Nights</dt>
      <dd id="night-count">7</dd>
    </div>
    <div>
      <dt>Total</dt>
      <dd id="total-charge">1393 USD</dd>
    </div>
  </dl>
  <style>
    dl {
      display: flex;
      width: max-content;
      gap: 1rem;
    }
    dl > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    dt {
      font-weight: bold;
    }
    dd {
      margin: 0;
    }
  </style>
</template>
```

---

## Implementing Observable with Proxy

```js
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
```

---

## Appendix

Helper function for creating templates from Javascript:

```js
function template(strings, ...values) {
  const html = strings.flatMap((s, i) =>
    i ? [values[i - 1], s] : [s]
  );
  let tpl = document.createElement("template");
  tpl.innerHTML = html;
  return tpl.content;
}
```
