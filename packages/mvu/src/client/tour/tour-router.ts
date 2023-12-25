import { LitElement, html } from "lit";
import { outlet } from "lit-element-router";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";

@outlet
@customElement("tour-router")
class TourRouter extends LitElement {
  render() {
    return html` <slot></slot> `;
  }
}
