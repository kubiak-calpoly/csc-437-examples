import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { ChatRoomElement } from "../components/chat-room";
import { EntourageTable } from "../components/entourage-table";
import resetCSS from "../css/reset";
import { Msg } from "../messages";
import { Model } from "../model";

export class EntourageViewElement extends View<Model, Msg> {
  static uses = define({
    "chat-room": ChatRoomElement,
    "entourage-table": EntourageTable
  });

  @property({ attribute: "tour-id", reflect: true })
  tourid?: string;

  @state()
  get tour() {
    return this.model.tour;
  }

  constructor() {
    super("blazing:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    console.log("ATTRIBUTE CHANGED", name, oldValue, newValue);
    if (
      name === "tour-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Tour Page:", newValue);
      this.dispatchMessage([
        "tour/select",
        {
          tourid: newValue
        }
      ]);
    }
  }

  render() {
    const { entourage } = this.tour || {};
    const tourName = this.tour?.name;

    console.log("RENDER", this.tourid, this.tour);

    if (entourage) {
      return html`
        <main class="page">
          <aside>
            <a
              class="breadcrumb"
              href="/app/tour/${this.tourid}">
              ${tourName}
            </a>
            <entourage-table
              .using=${entourage}></entourage-table>
          </aside>
          <section class="chat">
            <chat-room tour-id=${this.tourid}></chat-room>
          </section>
        </main>
      `;
    } else {
      return html``;
    }
  }

  static styles = [
    resetCSS,
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
