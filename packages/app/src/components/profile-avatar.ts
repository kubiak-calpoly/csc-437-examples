import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class ProfileAvatarElement extends LitElement {
  @property()
  color: string = "white";

  @property()
  src?: string;

  @property()
  initial?: string;

  render() {
    return html`
      <div
        class="avatar"
        style="
        ${this.color
        ? `--avatar-backgroundColor: ${this.color};`
        : ""}
        ${this.src
        ? `background-image: url('${this.src}');`
        : ""}
      ">
        ${this.src ? "" : this.initial || ""}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: contents;
      --avatar-backgroundColor: var(--color-accent);
      --avatar-size: 100px;
    }
    .avatar {
      grid-column: key;
      justify-self: end;
      position: relative;
      width: var(--avatar-size);
      aspect-ratio: 1;
      background-color: var(--avatar-backgroundColor);
      background-size: cover;
      border-radius: 50%;
      text-align: center;
      line-height: var(--avatar-size);
      font-size: calc(0.66 * var(--avatar-size));
      font-family: var(--font-family-display);
      color: var(--color-link-inverted);
      overflow: hidden;
    }
  `;
}
