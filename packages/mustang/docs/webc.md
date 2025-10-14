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
  "mu-auth": Auth.Element,
  "blz-header": HeaderElement
})
```
