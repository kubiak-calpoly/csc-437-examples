import { css, Events, html, shadow } from "@unbndl/html";
import reset from "./reset.css.js";

export class BlzHeaderElement extends HTMLElement {
  static {
    window.Events = Events;

    const page = document.body;

    page.addEventListener("dark-mode",
      (ev) => {
        page.classList.toggle("dark-mode", ev.detail.checked);
      }
    )
  }

  static template = html`
    <template>
      <header>
        <slot>
          <h1>Blazing Travels</h1>
        </slot>  
        <label
          onchange="Events.relay(event, 'dark-mode', 
                  {checked: event.target.checked})"
        >
          <input type="checkbox" autocomplete="off" />
          Dark mode
      </header>
    </template>
  `;


  constructor() {
    super();

    shadow(this)
      .template(BlzHeaderElement.template)
      .styles(
        reset.styles,
        BlzHeaderElement.styles
      );
  }

  static styles = css`
        :host {
          display: contents;
        }

        * {
          margin: 0;
          box-sizing: border-box;
        }

        header {
          grid-column: start / end;
          margin: 0 calc(-0.5 * var(--page-grid-gap));
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding: var(--size-spacing-medium);
          /* flex-wrap: wrap;
          gap: var(--size-spacing-xlarge); */
          background-color: var(--color-background-header);
          color: var(--color-text-inverted);
        }

        header a[href] {
          color: var(--color-link-inverted);
        }

        h1 {
          font-family: var(--font-family-display);
          line-height: var(--font-line-height-display);
          font-size: var(--size-type-xxlarge);
          font-style: oblique;
          line-height: 1;
          font-weight: var(--font-weight-bold);
        }

        ul {
          list-style: none;
          padding: var(--size-spacing-medium);
        }
     `;
}

