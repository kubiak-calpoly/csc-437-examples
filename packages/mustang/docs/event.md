# Handling Events

Events are essential to building interactive interfaces.
In Mustang, they are also used to communicate between components.
`CustomEvent`s allow us to define new types of events to handle specific interactions.
When events are dispatched from the Shadow DOM, it can be difficult to determine which specific element was the original target.

Mustang provides some utilities to handle these common patterns.

## `dispatchCustom`

```ts
function dispatchCustom(
  target: EventTarget,
  customType: string,
  detail?: any
)
```

This function combines the creation and dispatch
of a new custom event.

The event created will have both `bubbles` and `composed` set to `true`.

### Usage

```js
import { Events } from "@calpoly/mustang";

// in class MyElement extends HTMLElement...
Events.dispatchCustom(
  this,
  "ui-theme:toggle",
  {theme: this.checkbox.checked ? "dark" : "light"}
);
```

## `relay`

```ts
export function relay(
  event: Event,
  customType: string,
  detail?: any
)
```

It's common for components to listen for an event on an internal element, and _relay_ it upward, out of the component, changing it to a custom element.
This pattern is supported by the _relay_ function.

### Usage

```js
import { Events } from "@calpoly/mustang";

// in class MyElement extends HTMLElement...
this.addEventListener("change", (event) =>
  Events.relay(event, "dark-mode:toggle",
    {checked: event.target?.checked}
  )
);
```

## `originalTarget`

```ts
export function originalTarget(
  event: Event,
  selector: string = "*"
)
```

It's sometimes necessary to determine the original target of an event, or the closest element of a certain type to that target. This is particularly troublesome in the case of the Shadow DOM, where events are _retargeted_ to the custom element.

This function determines the composed path of the event through the Shadow DOM to the original target,
comparing each element to a CSS selector.

### Usage

```js
import { Events } from "@calpoly/mustang";

document.body.addEventListener(
  "click",
  (event) => {
    const link =
      Events.originalTarget(event, "a[href]");
    if (link) {
      event.preventDefault();
      // we will route the link ourselves...

    }
})
```
