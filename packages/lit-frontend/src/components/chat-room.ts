import { css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { APIUser, View } from "@calpoly/mustang";
import { Model } from "../model";
import { Message } from "../messages";
import {
  Connection,
  createConnection,
  sendMessage
} from "../websocket";
import { ChatMessage } from "ts-models";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

@customElement("chat-room")
export class ChatRoomElement extends View<Model, Message> {
  get username() {
    return this.getFromModel<APIUser>("user")?.username;
  }

  @property({ attribute: "tour-id" })
  tourId?: string;

  connection?: Connection | undefined;

  @state()
  messages: ChatMessage[] = [];

  firstUpdated() {
    if (!this.connection && this.tourId) {
      this.connection = createConnection<ChatMessage>(
        `chatroom${this.tourId}`,
        (msg: ChatMessage) => this._handleMessage(msg)
      );
      console.log("Connection created", this.connection);
    }
  }

  render() {
    return html`
      <ul>
        ${this.messages.map(
          (msg) =>
            html`
              <li>${msg.username}: ${msg.text}</li>
            `
        )}
      </ul>
      <form @submit=${this._handleSubmit}>
        <input name="text" placeholder="Type a message..." />
        <input type="submit" value="Send"></input>
      </form>
    `;
  }

  static styles = [
    unsafeCSS(resetCSS),
    unsafeCSS(pageCSS),
    css``
  ];

  _handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.tourId && this.username && this.connection) {
      const target = event.target as HTMLFormElement;
      const formdata = new FormData(target);
      const text = formdata.get("text")?.toString() || "";

      sendMessage<ChatMessage>(this.connection, {
        username: this.username,
        tourId: this.tourId,
        text
      });
      target.reset();
    }
  }

  _handleMessage(message: ChatMessage) {
    console.log("Received message", message);
    this.messages = this.messages.concat([message]);
  }
}
