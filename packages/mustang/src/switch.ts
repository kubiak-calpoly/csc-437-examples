import { css, html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import Route from "route-parser";
import * as History from "./history";
import { Observer } from "./observer";

type RouteParams = {
  [key: string]: string;
};

type RouteView = (arg: RouteParams) => TemplateResult;
type RouteRedirect = string | ((arg: RouteParams) => string);

interface MatchPath {
  path: string;
  query?: URLSearchParams;
  params?: RouteParams;
}

interface CaseRoute {
  route: Route;
}

interface SwitchPath {
  path: string;
}

interface ViewCase {
  view: RouteView;
}

interface RedirectCase {
  redirect: RouteRedirect;
}

type SwitchRoute = SwitchPath & (ViewCase | RedirectCase);
type Case = CaseRoute & (ViewCase | RedirectCase);
type Match = MatchPath & (ViewCase | RedirectCase);

export class Switch extends LitElement {
  _cases: Case[] = [];
  _historyObserver: Observer<History.Model>;
  _fallback: RouteView = () =>
    html`
      <h1>Not Found</h1>
    `;

  @property()
  _match?: Match;

  constructor(routes: SwitchRoute[], historyContext: string) {
    super();
    this._cases = routes.map((r) => ({
      ...r,
      route: new Route(r.path)
    }));
    this._historyObserver = new Observer<History.Model>(
      this,
      historyContext
    );
  }

  override connectedCallback() {
    this._historyObserver.observe(({ location }) => {
      console.log("New location", location);
      if (location) this._match = this.matchRoute(location);
    });
    super.connectedCallback();
  }

  override render() {
    console.log("Rendering for match", this._match);
    const renderView = () => {
      if (this._match) {
        if ("view" in this._match)
          return this._match.view(this._match.params || {});
        if ("redirect" in this._match) {
          const redirect = this._match.redirect;
          if (typeof redirect === "string") {
            this.redirect(redirect);
            return html`
              <h1>Redirecting to ${redirect}…</h1>
            `;
          }
        }
      }
      return this._fallback({});
    };

    return html`
      <main>${renderView()}</main>
    `;
  }

  override updated(
    changedProperties: Map<PropertyKey, unknown>
  ): void {
    if (changedProperties.has("_match")) this.requestUpdate();
  }

  static override styles = css`
    :host,
    main {
      display: contents;
    }
  `;

  matchRoute(location: Location): Match | undefined {
    const { search, pathname } = location;
    const query = new URLSearchParams(search);
    const path = pathname + search;

    for (const option of this._cases) {
      const params = option.route.match(path);
      if (params) {
        const match = {
          ...option,
          path: pathname,
          params,
          query
        };
        return match;
      }
    }

    return;
  }

  redirect(href: string) {
    History.dispatch(this, "history/redirect", { href });
  }
}

export {
  Switch as Element,
  type RouteParams as Params,
  type SwitchRoute as Route
};
