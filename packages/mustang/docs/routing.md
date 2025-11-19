# Client-side Routing

Mustang includes a custom element
(typically defined as `<mu-switch>`) which implements
client-side routing for single-page apps.
Typically, you will use `<mu-switch>` along with
`<mu-history>` to maintain navigation state in the
URL, allowing users to navigate to different screens
of your app, without reloading the page.

In the HTML page, `<mu-switch>` must be a descendant
of `<mu-history>`, as well as `<mu-auth>` (to enable
protected routes).
Any portions of the page which should not be re-rendered
when the URL changes should be placed outside of `<mu-switch>`

A typical boilerplate for a SPA app looks like this:

```html
<body>
  <mu-history provides="blazing:history" root="/app">
    <mu-auth provides="blazing:auth" redirect="/login.html">
      <article class="page">
        <blazing-header></blazing-header>
        <mu-switch></mu-switch>
      </article>
    </mu-auth>
  </mu-history>
</body>
```

## `Switch.Element`

`Switch.Element` is a custom element which loads
other components into its own Shadow DOM. The component
loaded is specified by matching the current page location (URL)
against a series of `routes`. The contents automatically
change whenever the page location changes.

### Usage

Because it requires the `routes` to be configured, you must
implement a custom element which extends `Switch.Element`
in your app, and bind that to the tag name. The examples
here assume the tag name is `<mu-switch>`.

```ts
import { …, History, Switch } from "@calpoly/mustang";

define({
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "blazing:history", "blazing:auth");
    }
  },
  // etc., other custom element definitions
})
```

### `constructor`

The `constructor` for `Switch.Element`, invoked as `super()`
from your derived class, takes three parameters:

- the `routes` array (see below)
- the id of the context provided by `<mu-history>`
- the id of the context provided by `<mu-auth>` (optional)

### `routes`

`Switch.Element` uses a list of routes to map a URL to
a view. Each route includes a `path` pattern and an
associated `view` function.

```ts
{
  path: "/app/traveler/:id",
  view: (params: Switch.Params) =>
    html`<traveler-view userid=${params.id}>
      </traveler-view>`
}
```

The `path` may contain parameters, indicated by a leading `:`.
Parameters match any string in the URL, except `/`. If a match is made,
the matching string for each parameter is made available to the `view`
function through the `params` object.

Query parameters (the portion of the URL after the `?`) are not considered
when matching.  However, they are made available to the `view` function as a
`URLSearchParams` object.

`Switch.Element` is configured by providing an array of these route objects.
On loading a new page, and again whenever the page's location changes,
`Switch.Element` attempts to match the URL against each route in order.
For the first route which matches, the `view` is rendered.
For this reason, routes should be ordered from most specific to most general,
to avoid matching on a more general "catch-all" route when a more specific
route would also match.

> Note that `Switch.Element` expects the view function to return
> a [Lit](https://lit.dev) template, so the `html` function
> should be imported from `lit`.

Routes may contain a `redirect` URL instead of a `view`, in which case
`<mu-switch>`, in conjunction with `<mu-history>` changes the URL to the
`redirect` URL, and then attempts to find a route for the new URL.
Redirects are commonly used for the `/` route, which will always match
if no previous routes are found.

```ts
const routes = [
  {
    path: "/app/profile/:id",
    view: (
      params: Switch.Params,
      query: URLSearchParams
    ) =>
      html`<traveler-view 
        userid=${params.id}
        mode="${query?.get("mode") || "view"}">
      </traveler-view>`
  }, {
    path: "/app",
    view: () =>
      html`<home-view></home-view>`
  },
  {
    path: "/",
    redirect: "/app"
  }
];
```



### Protected routes

To restrict views to authenticated users only, you may
specify `auth: "protected"` on any route. If a protected
route matches, and the user is not authenticated, `<mu-switch>`,
in conjunction with `<mu-auth>`, will redirect to the login page,
while passing the current requested URL in the `?next=` query
parameter. When properly configured, this allows the user
to return to the requested page directly after logging in.

## `History.Provider`

Another custom element
provides the page history, which is a stack of previously visited URLs. 
Mustang provides the class `History.Provider`
for this purpose, and it is usually bound to the
tag name `mu-history`.

The `provides=` attribute on `mu-history` allows
you to assign a name to the context, so that
observing elements can discover it.

In addition to making the history available 
throughout the app (including `mu-switch`),
`mu-history` also catches any link navigation
that should be handled within the single-page
app and prevents page reload in those cases.

External links (links to different _origins_, or servers) are not prevented, since they cannot 
be routed client-side.  There may be additional
links which, though hosted on the same server, are
not handled by `mu-switch`. A common example is
the login page.

The `mu-history` element takes an additional
attribute, `root=`, which, if set, is the
path under which all of the routes in `mu-switch`
lie. If `root` is set, then any links to URLs that 
are on the same server, but do not begin with the `root`
path are allowed to proceed and cause a reload of the page.
