import { css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { View } from "@calpoly/mustang";
import { Model } from "../model";
import { Message } from "../messages";
import { Tour } from "ts-models";
import "../components/entourage-table";
import "../components/chat-room";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

type EntourageLocation = Location & {
  params: { tour: string };
};

@customElement("entourage-page")
export class EntouragePageElement extends View<Model, Message> {
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
            <chat-room tour-id=${this.tourId}></chat-room>
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
}
