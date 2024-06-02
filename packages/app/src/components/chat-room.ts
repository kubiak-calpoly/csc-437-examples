import { Auth, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { ChatMessage } from "server/models";
import resetCSS from "../css/reset";
import {
  Connection,
  createConnection,
  sendMessage
} from "../utils/websocket";

export class ChatRoomElement extends LitElement {
  @property({ attribute: "tour-id" })
  tourid?: string;

  connection?: Connection | undefined;

  @state()
  messages: ChatMessage[] = [];

  @property()
  username = "anonymous";

  firstUpdated() {
    if (!this.connection && this.tourid) {
      this.connection = createConnection<ChatMessage>(
        `chatroom${this.tourid}`,
        (msg: ChatMessage) => this._handleMessage(msg)
      );
      console.log("Connection created", this.connection);
    }
  }

  _authObserver = new Observer<Auth.Model>(
    this,
    "blazing:auth"
  );

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.username) {
        this.username = user.username;
      }
    });
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

  static styles = [resetCSS, css``];

  _handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.tourid && this.username && this.connection) {
      const target = event.target as HTMLFormElement;
      const formdata = new FormData(target);
      const text = formdata.get("text")?.toString() || "";

      sendMessage<ChatMessage>(this.connection, {
        username: this.username,
        tourid: this.tourid,
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
