import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("profile-page")
export class ProfilePagelement extends LitElement {
  render() {
    return html`
      <auth-required>
        <header>
          <h1>Blazing Travels</h1>
          <p>12 days in Italy</p>
          <p>
            Hello,
            <drop-down align="right">
              Blaze
              <user-panel
                slot="menu"
                avatar="/data/avatars/Blaze Pasquale.png">
                <span slot="name">Blaze Pasquale</span>
              </user-panel>
            </drop-down>
          </p>
        </header>
        <main class="page">
          <profile-form path="/profiles/blaze"> </profile-form>
        </main>
      </auth-required>
    `;
  }
}
