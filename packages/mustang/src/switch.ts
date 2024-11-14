import { css, html, LitElement, TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import Route from "route-parser";
import * as Auth from "./auth";
import * as History from "./history";
import { Observer } from "./observer";

type RouteParams = {
  [key: string]: string;
};

type RouteView = (
  params: RouteParams,
  query?: URLSearchParams
) => TemplateResult;
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
  auth?: "public" | "protected";
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
  _authObserver: Observer<Auth.Model>;

  @state()
  _user?: Auth.User;
  _fallback: RouteView = () => html` <h1>Not Found</h1> `;

  @state()
  _match?: Match;

  constructor(
    routes: SwitchRoute[],
    historyContext: string,
    authContext: string = ""
  ) {
    super();
    this._cases = routes.map((r) => ({
      ...r,
      route: new Route(r.path)
    }));
    this._historyObserver = new Observer<History.Model>(
      this,
      historyContext
    );
    this._authObserver = new Observer<Auth.Model>(
      this,
      authContext
    );
  }

  override connectedCallback() {
    this._historyObserver.observe(({ location }) => {
      console.log("New location", location);
      if (location) this._match = this.matchRoute(location);
    });
    this._authObserver.observe(({ user }) => {
      this._user = user;
    });
    super.connectedCallback();
  }

  override render() {
    console.log("Rendering for match", this._match, this._user);
    const renderView = () => {
      const m = this._match;
      if (m) {
        if ("view" in m) {
          if (!this._user) {
            return html` <h1>Authenticating</h1> `;
          }
          if (
            m.auth &&
            m.auth !== "public" &&
            this._user &&
            !this._user.authenticated
          ) {
            Auth.dispatch(this, "auth/redirect");
            return html` <h1>Redirecting for Login</h1> `;
          } else {
            console.log("Loading view, ", m.params, m.query);
            return m.view(m.params || {}, m.query);
          }
        }
        if ("redirect" in m) {
          const redirect = m.redirect;
          if (typeof redirect === "string") {
            this.redirect(redirect);
            return html` <h1>Redirecting to ${redirect}…</h1> `;
          }
        }
      }
      return this._fallback({});
    };

    return html` <main>${renderView()}</main> `;
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
