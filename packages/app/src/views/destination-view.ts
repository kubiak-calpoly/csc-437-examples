import { define, History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Destination, Excursion } from "server/models";
import { AccommodationElement } from "../components/accommodation";
import { ExcursionCardElement } from "../components/excursion-card";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";
import { formatDate } from "../utils/dates";

export class DestinationViewElement extends View<Model, Msg> {
  static uses = define({
    "excursion-card": ExcursionCardElement,
    "accommodation-info": AccommodationElement
  });

  @property({ attribute: "tour-id" })
  tourid = "";

  @property({ type: Number })
  index = 0;

  @state()
  get destination(): Destination | undefined {
    return this.model.tour?.destinations[this.index];
  }

  @state()
  image? = this.destination?.featuredImage;

  constructor() {
    super("blazing:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "tour-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Tour Page:", newValue);
      this.dispatchMessage([
        "tour/select",
        { tourid: newValue }
      ]);
    }
  }

  render() {
    const {
      name,
      startDate,
      endDate,
      featuredImage,
      accommodations = [],
      excursions = []
    } = this.destination || ({} as Destination);
    const imageUrl = this.image || featuredImage;
    const acc = accommodations[0] || { rate: {} };

    return html`
      <main class="page">
        <header>
          <h2>${name}</h2>
          <p>
            from ${formatDate(startDate)} to
            ${formatDate(endDate)}
            ${endDate && endDate.getFullYear()}
          </p>
          <button
            @click=${() =>
        History.dispatch(this, "history/navigate", {
          href: `/app/destination/${this.tourid}/${this.index}/edit`
        })}
            >Edit</button
          >
        </header>
        <img class="hero" src=${imageUrl} />
        <accommodation-info .using=${acc}> </accommodation-info>
        <ul class="excursions">
          ${excursions.map(
          (x: Excursion) =>
            html`
                <li>
                  <excursion-card type="${x.type}">
                    ${x.name}
                  </excursion-card>
                </li>
              `
        )}
        </ul>
      </main>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
      header {
        grid-column: 1 / span 3;
      }
      main.page {
        --page-grids: 8;

        display: grid;
        grid-column: 1/-1;
        grid-template-columns: repeat(var(--page-grids), 1fr);
        gap: var(--size-spacing-small)
          var(--size-spacing-medium);
        padding: var(--size-spacing-medium);
        grid-template-rows: auto auto 1fr auto;
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
      }
      .page > accommodation-info {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / span 3;
      }
      .page > .hero {
        grid-column: span min(5, var(--page-grids)) / -1;
        grid-row: auto / span 2;
      }
      .page > .excursions {
        display: contents;
        list-style: none;
        padding: 0;
      }
      .excursions > * {
        grid-column: auto / span 2;
      }
      @media screen and (max-width: 50rem) {
        main.page {
          --page-grids: 4;
        }
      }
      @media screen and (max-width: 30rem) {
        main.page {
          --page-grids: 2;
        }
      }
      @media screen and (min-width: 75rem) and (max-width: 100rem) {
        main.page {
          --page-grids: 12;
        }
        .page > .hero {
          grid-column-start: span 8;
        }
      }
      @media screen and (min-width: 100rem) {
        main.page {
          --page-grids: 16;
        }
        .page > .hero {
          grid-column: 5 / span 8;
          grid-row: auto / span 3;
        }
      }
    `
  ];
}
