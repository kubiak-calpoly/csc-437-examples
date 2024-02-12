import { html, LitElement } from "lit";
import { navigator } from "lit-element-router";
import { customElement, property } from "lit/decorators.js";

@navigator
class TourLink extends LitElement {
  @property()
  href = "#";

  render() {
    return html`
      <a href="${this.href}" @click="${this.linkClick}">
        <slot></slot>
      </a>
    `;
  }

  navigate(href: string) {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new CustomEvent("route"));
  }

  linkClick(event: MouseEvent) {
    event.preventDefault();
    this.navigate(this.href);
  }
}

customElements.define("tour-link", TourLink);
