import { css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import * as App from "../app";
import { APIUser } from "../rest";
import { Tour, ChatMessage } from "ts-models";
import "../components/entourage-table";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

type EntourageLocation = Location & {
  params: { tour: string };
};

@customElement("entourage-page")
export class EntouragePageElement extends App.View {
  @property({ attribute: false })
  location?: EntourageLocation;

  @property({ attribute: "tour-id", reflect: true })
  get tourId() {
    return this.location?.params.tour;
  }

  @property()
  get tour() {
    return this.getFromModel<Tour>("tour");
  }

  @property()
  get username() {
    return this.getFromModel<APIUser>("user")?.username;
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    if (
      name === "tour-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Tour Page:", newValue);
      this.dispatchMessage({
        type: "TourSelected",
        tourId: newValue
      });
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  render() {
    const { entourage } = this.tour || {};
    const tourName = this.tour?.name;

    if (entourage) {
      return html`
        <main class="page">
          <aside>
            <a class="breadcrumb" href="/app/${this.tourId}">
              ${tourName}
            </a>
            <entourage-table
              .using=${entourage}></entourage-table>
          </aside>
          <section class="chat">
            <form @submit=${this._handleSubmit}>
              <input
                name="text"
                placeholder="Type a message..." />
              <button type="submit">Send</button>
            </form>
          </section>
        </main>
      `;
    } else {
      return html``;
    }
  }

  static styles = [
    unsafeCSS(resetCSS),
    unsafeCSS(pageCSS),
    css`
      :host {
        display: contents;
      }
      main.page {
        display: grid;
        grid-template-columns: fit-content 1fr;
        grid-template-areas: "aside chat";
      }
      aside {
        grid-area: aside;
      }
      .chat {
        grid-area: chat;
      }
    `
  ];

  _handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.tourId) {
      const target = event.target as HTMLFormElement;
      const formdata = new FormData(target);
      const entries = Array.from(formdata.entries());
      const json = Object.assign(
        {
          username: this.username,
          tourId: this.tourId
        },
        Object.fromEntries(entries) as { text: string }
      );

      this.dispatchMessage({
        type: "ChatMessageSent",
        message: json as ChatMessage
      });
    }
  }
}
