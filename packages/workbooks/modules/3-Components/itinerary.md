---
title: Itinerary Custom Element
platform: web-standard
---

# Itinerary with Custom Element Markup

```html
<blz-itinerary>
  <blz-destination>
    <span slot="nights">4</span>
    <span slot="name">Venice</span>
    <span slot="dates">14 Oct - 18 Oct</span>
    <blz-accommodation>
      <a href="#">Locanda San Barnaba</a>
    </blz-accommodation>
    <blz-excursion>
      <a href="#">Murano</a>
    </blz-excursion>
    <blz-excursion type="walking">
      <a href="#">Piazza San Marco</a>
    </blz-excursion>
  </blz-destination>
</blz-itinerary>
```

Here's how you might mark up the first destination of the itinerary
with much greater precision than you were able to do in HTML
I've created some new tag names so I can later define very semantics.
And because those semantics are specific to our application, Blazing Travels, I've put
a prefix of `blz-` on each of the tag names.
This way, there is no ambiguity, either with standard HTML tags—which are guaranteed to
never include a hyphen—or custom elements in other projects.

Try loading this markup into a browser, and you will just see the text in the three `<span>`
elements and the three links, all one one line.
If you inspect the page in Developer Tools, though, you will see the element hierarchy.
For any element with an unrecognized tag name, the browser just displays its contents.
That's why only the `<span>` elements and `<a>` elements are displayed.

If you want to do anything else—you need to _register_ the tag name as a custom element.
And that must be done using Javascript.

So you have to learn Javascript. Yeah, not only that, you need to learn Javascript classes,
which are nothing like the `class` attribute in HTML.
But the good part of this, is that much of the code that defines each of these custom
elements can be written in HTML/CSS.
You will actually end up re-using a lot of the HTML and CSS that you wrote previously.
Before getting to Javascript, I'll show you the HTML and CSS required to define
your own custom element.

```html
<template id="blz-accommodation-template">
  <p>Stay at <slot>*** Accommodation Name Goes HERE ***</slot></p>
  <style>
    * {
      margin: 0;
    }
  </style>
</template>
```

Custom elements are defined in HTML using the `<template>` element.
HTML `<template>` elements can be put almost anywhere, but putting them in the `<head>` keeps
them separate from content.

The `<slot>` element is a placeholder. The contents of the `<blz-accommodation>` element will be
inserted there. The text "**_ ... _**" will only appear if `<blz-accommodation>` is empty.

The template also contains a `<style>` element, which, like the `<style>` element within a `<head>`
element, contains CSS code.
The difference, when `<style>` is used within a template, is that the CSS rules _only_
affect the elements in the template.
Moreover, the elements in the template are _not_ affected by any CSS anywhere else in the document,
including `<style>` elements, and linked stylesheets.

<aside>Shadow DOM vs light DOM. CSS properties not inherited across shadow DOM boundary.</aside>

Now for the Javascript code to register the tag name `blz-accommodation` and connect
it with the `<template>`.
All Javascript goes in a `<script>` element.
For now, we'll keep all `<script>` element in the `<head>`.
First, you need to define a `class`.

```js
class BlzAccommodation extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("blz-accommodation-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }
}

customElements.define("blz-accommodation", BlzAccommodation);
```

<aside>Need some basic Javascript syntax  here</aside>

The class must extend the standard Javascript class `HTMLElement`, which means it
has all the capabilities of any other HTML element.

By registering the tag name `blz-accommodation` and linking it to class `BlzPlace`,
you are going to tell the browser to use class `BlzAccommodation` instead of `HTMLElement`
to construct a new element node in the _DOM_—the Document Object Model.
For now, this line can go in the same `<script>` tag as the class definition above.

<aside>Need to know about the DOM.</aside>

---

## Assembling Parts of the Destination

```html
<blz-destination>
  <span slot="nights">4</span>
  <span slot="name">Venice</span>
  <span slot="dates">14 Oct - 18 Oct</span>
  <blz-accommodation><a href="#">Locanda San Barnaba</a></blz-accommodation>
  <blz-excursion><a href="#">Murano</a></blz-excursion>
  <blz-excursion type="walking"><a href="#">Piazza San Marco</a></blz-excursion>
</blz-destination>
```

This `blz-destination` contains six elements, the first three of which have a `slot`
attribute.
These are _named slots_.
When a direct descendent of a custom element has a `slot` attribute,
that element will be used as the contents of the `<slot>`
in the template that has the same name.
For example, the `<span slot="name">` element will become the
content of the `<slot name="name">` slot.

Take a look at the following template for this `<blz-destination>` custom element.
Note that it contains four `<slot>` elements, three of which have `name` attributes.

```html
<template id="blz-destination-template">
  <p><slot name="dates">*** Date Range ***</slot></p>
  <header>
    <h2><slot name="name">*** Name of Destination ***</slot></h2>
    <p><slot name="nights">##</slot> nights</p>
  </header>
  <div class="list">
    <slot>*** Accommodations and Excursions Go HERE ***</slot>
  </div>
  <style>
    * {
      margin: 0;
    }
    :host {
      display: grid;
      grid-template-columns: [dates] auto [header] 1fr [info] 3fr [info-end];
      gap: var(--size-spacing-medium) var(--size-spacing-large);
      align-items: baseline;
    }
    header {
      --color-text: var(--color-text-inverted);
      --color-text-heading: var(--color-text-inverted);
      --color-link: var(--color-link-inverted);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
      padding: var(--size-spacing-small);
      background: var(--color-background-header);
      color: var(--color-text);
    }
    h2 {
      color: var(--color-text-heading);
      font-family: var(--font-display);
    }
    .list {
      display: flex;
      flex-direction: column;
      grid-column: info / info-end;
    }
  </style>
</template>
```

We need to bring in the reset and some of `page.css` because CSS declarations
are not inherited from the light DOM to the shadow DOM.

```js
class BlzDestination extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("blz-destination-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }
}

customElements.define("blz-destination", BlzDestination);
```

---

## Specific Semantics with Custom Attributes

```html
<blz-destination>
  <span slot="nights">4</span>
  <span slot="name">Venice</span>
  <span slot="dates">14 Oct - 18 Oct</span>
  <blz-accommodation><a href="#">Locanda San Barnaba</a></blz-accommodation>
  <blz-excursion><a href="#">Murano</a></blz-excursion>
  <blz-excursion type="walking"><a href="#">Piazza San Marco</a></blz-excursion>
</blz-destination>
```

There are different types of excursions that we want to represent differently.
In the prototype, the text "Walking tour of" was part of the content.
But you would like all walking tours to use the same text,
or perhaps, eventually, an icon.
This text could also be translated into a persons' preferred language.
In short, this text should not be part of the data, but the interface.

One way to remove this text from the data of the app and make part of the interface,
is categorize excursions by type and specify the type through a custom attribute.

The template for an excursion is much like that for accommodation.
The difference is that the `<p>` has an `id`, which will allow us to access it easily from
Javascript.

```html
<template id="blz-excursion-template">
  <p id="message">
    Visit <slot id="place">*** Place Visited Goes HERE ***</slot>
  </p>
  <style>
    * {
      margin: 0;
    }
  </style>
</template>
```

There's no feature for pulling attribute values into an HTML template,
like `<slot>` does for contents.
This must be done by Javascript code in the custom element's class.

```js
class BlzExcursion extends HTMLElement {
  constructor() {
    super();
    const content = document.getElementById("blz-excursion-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }

  connectedCallback() {
    const type = this.getAttribute("type");

    if (type) {
      this._updateMessage(type);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "type") {
      this._updateMessage(newValue);
    }
  }

  _updateMessage(type) {
    let message = this.shadowRoot.getElementById("message");
    let place = this.shadowRoot.getElementById("place");

    switch (type) {
      case "bus":
        message.replaceChildren("Take a city bus to ", place);
        break;
      case "metro":
        message.replaceChildren("Travel to ", place, " via Metro");
        break;
      case "train":
        message.replaceChildren(place, " by train");
        break;
      case "walking":
        message.replaceChildren("Tour ", place, " on foot");
        break;
      default:
        message.replaceChildren("Visit ", place);
        break;
    }
  }
}

customElements.define("blz-excursion", BlzExcursion);
```

You shouldn't normally hard-code messages like this.
In later chapters, you'll learn how to store interface copy so that it can be
easily updated and localized.

---

## Container Controls Layout

```html
<blz-itinerary>
  <blz-destination>
    <span slot="nights">4</span>
    <span slot="name">Venice</span>
    <span slot="dates">14 Oct - 18 Oct</span>
    <blz-accommodation><a href="#">Locanda San Barnaba</a></blz-accommodation>
    <blz-excursion><a href="#">Murano</a></blz-excursion>
    <blz-excursion type="walking"
      ><a href="#">Piazza San Marco</a></blz-excursion
    >
  </blz-destination>
  <blz-destination>
    <span slot="nights">3</span>
    <span slot="name">Florence</span>
    <span slot="dates">18 Oct - 21 Oct</span>
    <blz-accommodation><a href="#">Hotel Perseo</a></blz-accommodation>
    <blz-excursion type="walking"
      ><a href="#">Duomo, Campanile</a></blz-excursion
    >
    <blz-excursion type="train"><a href="#">Lucca</a></blz-excursion>
    <blz-excursion type="bus"><a href="#">Fiesole</a></blz-excursion>
  </blz-destination>
  <blz-destination>
    <span slot="nights">4</span>
    <span slot="name">Rome</span>
    <span slot="dates">21 Oct - 25 Oct</span>
    <blz-accommodation><a href="#">La Piccola Maison</a></blz-accommodation>
    <blz-excursion type="metro"
      ><a href="#">Forum, Colosseum, Palatino Hill</a></blz-excursion
    >
    <blz-excursion type="metro"
      ><a href="#">Vatican, St Peter's</a></blz-excursion
    >
  </blz-destination>
</blz-itinerary>
```

```html
<template id="blz-itinerary-template">
  <div class="itinerary">
    <slot>*** Destinations and Transportation Go HERE ***</slot>
  </div>
  <style>
    .itinerary {
      display: grid;
      grid-template-columns:
        [start] auto [header] auto
        [info] 1fr 2fr 1fr 2fr [end];
      gap: var(--size-spacing-medium) var(--size-spacing-large);
      align-items: baseline;
      margin: var(--size-spacing-small);
    }

    ::slotted(*) {
      grid-column: start / end;
      grid-template-columns: subgrid;
    }
  </style>
</template>
```

```js
class BlzItinerary extends HTMLElement {
  constructor() {
    super();
    let content = document.getElementById("blz-itinerary-template").content;
    this.attachShadow({ mode: "open" }).appendChild(content.cloneNode(true));
  }
}

customElements.define("blz-itinerary", BlzItinerary);
```

---

## Design Tokens

```css
:root {
  /* Design Tokens */
  --color-accent: rgb(42 143 42);
  --color-background-header: var(--color-accent);
  --color-background-page: rgb(237 233 217);
  --color-background-section: rgb(248 250 2248);
  --color-border-section: var(--color-accent);
  --color-link-inverted: rgb(255 208 0);
  --color-link: var(--color-accent);
  --color-text: rgb(51 51 51);
  --color-text-heading: var(--color-accent);
  --color-text-inverted: rgb(255 255 255);

  --font-body: Merriweather, Baskerville, Cambria, "Noto Serif",
    "Bitstream Charter", serif;
  --font-display: Kanit, "Trebuchet MS", Calibri, Roboto, "Segoe UI", Ubuntu,
    sans-serif;

  --lineweight-border-thin: 1px;
  --lineweight-rule: 1px;

  --size-font-body: 0.875rem;
  --size-font-title: 2.5rem;
  --size-radius-medium: 0.5rem;
  --size-spacing-small: 0.25rem;
  --size-spacing-medium: 0.5rem;
  --size-spacing-large: 1rem;

  --style-font-title: italic;

  --weight-font-body: 400;
  --weight-font-title: 700;
  --weight-font-title-muted: 200;
}
```

## Page CSS

```css
* {
  margin: 0;
}
body {
  background: var(--color-background-page);
  color: var(--color-text);
  font: var(--size-font-body) var(--font-body);
}
a {
  color: var(--color-link);
}
```
