## `define`

`define`( _defs_ : `ElementDefinitions` )

Defines HTML custom elements using the standard web API `customElements.define`.
The argument is an object mapping _tag names_ (which must include a
hyphen) to class constructors:

```ts
type ElementDefinitions = {
  [tag: string]: CustomElementConstructor;
};
```

The `define` function calls `customElements.define` for each
of the element definitions. Typically, this is done by
the _consumer_ of the components, where the tag name
is being used. This allows potential naming conflicts between
libraries to be resolved at the location where custom element classes
are imported.

> The convention in `mustang` is that libraries provide
> custom element classes, but do not bind them to tag names.
> Even where tag names are
> used in this documentation, the consuming module must
> bind them to the associated classes using `define`.

### Usage

```ts
import { define, Auth } from "@calpoly/mustang";

define({
  "mu-auth": Auth.Provider
})
