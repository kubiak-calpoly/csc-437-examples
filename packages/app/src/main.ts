import { Auth, define } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { HeaderElement } from "./components/blazing-header";
import { TourViewElement } from "./views/tour-view";

class AppElement extends LitElement {
  static uses = define({
    "blazing-header": HeaderElement,
    "tour-view": TourViewElement
  });

  protected render(): unknown {
    return html`define({ "mu-auth": Auth.Provider,
      "blazing-app": AppElement });
      <article>
        <blazing-header></blazing-header>
      </article> `;
  }
}

define({
  "mu-auth": Auth.Provider,
  "blazing-app": AppElement
});
