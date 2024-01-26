import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("hello-world")
class HelloWorldElement extends LitElement {
  render() {
    return html`<h1>Hello, <slot>world</slot>!</h1>`;
  }
}
