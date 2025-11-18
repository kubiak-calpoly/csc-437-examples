# API documentation

`@calpoly/mustang` is a lightweight library built on top of Web standards.
The intent is to provide the developer affordances common to
most frameworks, including:

- [HTML Templating](./html.md)
- [Event Handling](./events.md)
- [Web Components and Shadow DOM](./webc.md)
  - Integrates with [Lit](https://lit.dev)
- [Authentication and Authorization](./auth.md)
- [Client-side routing](./routing.md)
- The Elm Architecture (MVU)
  - [Store provider](./store.md)
  - Views

## Using with JavaScript or TypeScript

Mustang is implemented in TypeScript and
provided as ES modules and type descriptor files.
Use the JavaScript `import` statement to bring
definitions from Mustang into your code.

```ts
import { html, Auth } from "@calpoly/mustang";
```

Refer to code examples for each Mustang feature
for an example of the relevant `import` statement.


## Using with Vite

You will need to install Mustang into your project for [Vite](vite.dev) to resolve the `import`s from `@calpoly/mustang`,

You can use `npm` to install Mustang into your project as follows:

```sh
npm install @calpoly/mustang
```

## Using in the browser

You can also use Mustang from `<script>` tags in your HTML. Because we use ES modules, the `type="module"` attribute must be specified:

```html
<script type="module" src="myapp.js"></script>

<script type="module">
  import { html } from "@calpoly/mustang";

  function sayHello() {
    const hello = html`<h1>Hello, world!</h1>`;
    document.body.append(hello);
  }
</script>
```

In order to use Mustang directly in the browser &mdash; either in `<script>` tags or in unbundled JavaScript files &mdash; you must set up an import map to resolve the `@calpoly/mustang` package name.

While you could serve mustang from your server, it may be more convenient to reference it from a site such as `unpkg.com`:

```html
<script type="importmap">
{
  "imports": {
    "@calpoly/mustang":
      "https://unpkg.com/@calpoly/mustang"
  }
}
</script>
```
