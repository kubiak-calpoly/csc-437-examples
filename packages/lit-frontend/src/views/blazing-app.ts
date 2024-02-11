import { html, LitElement, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../components/auth-required";
import "../components/blazing-header";
import "./tour-page";
import resetCSS from "/src/styles/reset.css?inline";

@customElement("blazing-app")
export class BlazingAppElement extends LitElement {
  @state()
  tourId?: string;

  connectedCallback() {
    super.connectedCallback();
    // path should be ["", "app", id]
    const url = new URL(document.location.toString());
    const path = url.pathname.split("/");
    // path should be ["", "app", id]
    let id =
      path[2] || url.searchParams.get("tour") || undefined;
    console.log("Tour path:", path, id);
    this.tourId = id;
  }

  render() {
    return html`
      <auth-required>
        <blazing-header></blazing-header>
        <tour-page tour-id=${this.tourId}> </tour-page>
      </auth-required>
    `;
  }

  static styles = [unsafeCSS(resetCSS)];
}
