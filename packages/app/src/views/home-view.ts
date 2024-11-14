import { Auth, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Tour } from "server/models";
import reset from "../styles/reset.css";
import {
  convertStartEndDates,
  formatDate
} from "../utils/dates";

export class HomeViewElement extends LitElement {
  src = "/api/tours";

  @state()
  tourIndex = new Array<Tour>();

  _authObserver = new Observer<Auth.Model>(
    this,
    "blazing:auth"
  );

  _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
      }
      this.hydrate(this.src);
    });
  }

  hydrate(url: string) {
    fetch(url, {
      headers: Auth.headers(this._user)
    })
      .then((res: Response) => {
        if (res.status === 200) return res.json();
        throw `Server responded with status ${res.status}`;
      })
      .catch((err) =>
        console.log("Failed to load tour data:", err)
      )
      .then((json: unknown) => {
        if (json) {
          console.log("Tours:", json);
          const { data } = json as { data: Array<Tour> };
          const tours = data.map(convertStartEndDates<Tour>);
          this.tourIndex = tours;
        }
      })
      .catch((err) =>
        console.log("Failed to convert tour data:", err)
      );
  }

  render() {
    const tourList = this.tourIndex.map(this.renderItem);

    return html`
      <main class="page">
        <header>
          <h2>Your Trips</h2>
        </header>
        <dl>${tourList}</dl>
      </main>
    `;
  }

  renderItem(t: Tour) {
    const { name, startDate, endDate } = t;
    const { _id } = t as unknown as { _id: string };

    return html`
        <dt>
          ${startDate.getUTCFullYear()}
        </dt>
        <dt>from
          <time datetime=${startDate}>
            ${formatDate(startDate)}
          </time>
        </dt>
        <dt> to
          <time datetime=${endDate}>
            ${formatDate(endDate)}
          </time>
        </dt>
        <dd>
          <a href="/app/tour/${_id}">${name}</a>
        </dt>
      `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
      main.page {
        display: grid;
        grid-column: 1/-1;
        padding: var(--size-spacing-small)
          var(--size-spacing-medium);
        grid-template-columns: subgrid;
        grid-template-rows: auto auto auto 1fr;
        grid-template-areas:
          "hd hd yr dt1 dt2 dd dd dd"
          "xx xx yr dt1 dt2 dd dd dd";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
        align-items: end;
      }
      header {
        grid-area: hd;
      }
      dl {
        display: contents;
      }
      dt {
        grid-area: yr;
        text-align: right;
      }
      dt + dt {
        grid-area: dt1;
        text-align: center;
      }
      dt + dt + dt {
        grid-area: dt2;
      }
      dd {
        grid-area: dd;
      }
      time {
        white-space: nowrap;
      }
    `
  ];
}
