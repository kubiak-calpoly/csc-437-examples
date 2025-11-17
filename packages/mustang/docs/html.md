# Writing HTML templates in JavaScript

We often need to embed fragments of HTML in JavaScript.
Using `html`-tagged template literals has several benefits:

- Variable parts of the template can be interpolated using `${...}` syntax.
- The resultant string is automatically parsed into a `DocumentFragment`
- Interpolated strings are automatically escaped, avoiding a frequent cause of errors and unsafe practices
- The `html` tag is recognized by most code editors, allowing for appropriate
  syntax highlighting and formatting

## `html`

```ts
function html(
  template: TemplateStringsArray,
  ...values: string[]
) : DocumentFragment
```

The `html`` function is defined such that it can be
used as a template literal tag. In general, a template literal can contain substitution parameters, by using the `${...}` syntax.

The `template` parameter is an array of all the strings in the template &mdash; before, between, and after the substitution parameters. It will always contain at least one string.

The `values` are the results of evaluating the
expressions in the substitution parameters.
These values are inserted in the resulting DOM in a manner which depends on their type:

`string`
: as `Text` nodes

`number`, `boolean`
: as `Text` nodes, after conversion to strings

`Array`
: as `DocumentFragment`s containing the
converted values of the array elements

`Node` (DOM)
: inserted directly without conversion. Most common usage is where the node is a `DocumentFragment` resulting from a nested `html`-tagged template literal expression.

Any other `object`, `symbol`, `bigint`:
: as `Text` nodes, after conversion to strings

### Usage

`html`-tagged template literals are typically
used for client-side rendering: generating DOM
that depends on data at run-time.

```ts
import { html } from "@calpoly/mustang";

const name = "CSC 437";
const today = new Date();
const colors = ["red", "blue", "green"];

const fragment = html`
  <h1>Hello, ${name}</h1>
  <p>Today is ${today}</p>
  <label>
    Select your favorite color:
    <select name="color">
      ${colors.map(
        (c) => html`<option value="$c">$c</option>`
      )}
    </select>
  <label>
`;
```
