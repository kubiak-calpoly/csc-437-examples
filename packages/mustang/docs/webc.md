# Working with Web Components

Web components are a standard way of creating components
(custom elements) in Vanilla JavaScript without relying
on any other compile-time or run-time tooling.

The standard APIs for web components are a bit cumbersome
and verbose, so Mustang provides some utilities to
reduce the learning curve.

## `define`

```ts
function define(
  defs: ElementDefinitions
)
```

Defines HTML custom elements using `customElements.define`. The
argument is an object mapping _tag names_ (which must include a
hyphen) to class constructors:

```ts
type ElementDefinitions = {
  [tag: string]: CustomElementConstructor;
};
```
### Usage

> Mustang encourages separating the _definition_ of the custom
> element class from the _binding_ of that class to a tag name.
> The `define` function makes it easier to bind multiple tag names
> at once, typically at the point of `import`ing the corresponding
> classes.

```js
import { define, Auth } from "@calpoly/mustang";
import { HeaderElement } from "../components/header.js";

define({
  "mu-auth": Auth.Provider,
  "blz-header": HeaderElement
})
```

## `shadow`

The `shadow` function is used to attach a Shadow DOM to
a custom element.
It is typically invoked as `shadow(this)`
from the `constructor` of
a custom element class.

```js
function shadow(
  element: HTMLElement,
  options: ShadowRootInit = { mode: "open" }
) : ShadowChain
```

The `shadow` function constructs the Shadow DOM for the
`HTMLElement` being constructed.
The object returned from `shadow` provides
two methods for

1. attaching a template, built using [`html`](./html.md)
2. attaching one or more constructed stylesheets, built using [`css`](./css.md)

### _shadowChain_ `.template(` _template_ `: DocumentFragment)`

This method attaches an HTML template to the Shadow DOM. The _template_
must be an HTML `<template>` element. See example below.

### _shadowChain_ `.styles(` ..._sheets_ `: CSSStyleSheet[])`

This method attaches one or more constructed style sheets to the
Shadow DOM, allowing encapsulated styling of the Shadow DOM.
See example below.

## Usage

```js
import { html, shadow } from "@calpoly/mustang";

class HelloWorldElement extends HTMLElement {
  static template = html`
    <template>
      <h1>Hello, World</h1>
    </template>
  `;

  static styles = css`
      h1 {
        font: var(--size-type-xlarge)
          var(--font-family-display);
      }
  `;

  constructor() {
    super();
    shadow(this)
      .template(HelloWorldElement.template)
      .styles(HelloWorldTemplate.styles);
  }
}
```
