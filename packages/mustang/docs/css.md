# Writing CSS Stylesheets in JavaScript

When styling custom elements, we need a way to
create a stylesheet in JavaScript.
For this purpose, Mustang provides the `css`
tagged template literal.

## `css`

```ts
function css(
  template: TemplateStringsArray,
  ...values: unknown[]
) : CSSStyleSheet
```

The `css` function is defined such that it can be
used as a template literal tag. In general, a template literal can contain substitution parameters, by using the `${...}` syntax.

The `template` parameter is an array of all the strings in the template &mdash; before, between, and after the substitution parameters. It will always contain at least one string.

The `values` are the results of evaluating the
expressions in the substitution parameters.
The expressions must evaulate to strings.

### Usage

`css`-tagged template literals are typically
used for styling the Shadow DOM in HTML custom elements.
This technique is known as _constructed style sheets_.

```js
class DropdownElement extends HTMLElement {
  static template = html` <template>
    <!-- ... -->
  </template>`;

  static styles = css`
    :host {
      position: relative;
    }
    #panel {
      display: none;
      position: absolute;
      /* etc... */
    }
    :host([open]) #panel {
      display: block;
    }
  `;

  constructor() {
    super();

    shadow(this)
      .template(DropdownElement.template)
      .styles(DropdownElement.styles);

    // ...
  }
}
```
