# Authentication and Authorization

Mustang includes a custom element
(typically defined as `<mu-auth>`) which provides auth
services for web apps.
Any component within the body of `<mu-auth>` may observe
the current auth state and set up _effects_ to run should
that state change.
`<mu-auth>` also accepts messages to implement user sign-in and sign-out.

## `Auth.Provider`

`Auth.Provider` is a custom element which implements the
Provider interface, allowing components within its scope
(including in Shadow DOM) to observe the state it maintains.

### Usage

The `Auth.Provider` is often instantiated in an HTML file.
First, `import` `Auth` from Mustang and `define` the custom element:

```html
  <script type="module">
    import { define, Auth } from "@calpoly/mustang";

    define({
      "mu-auth": Auth.Provider
    });
  </script>
```

Then it can be used in the HTML. Typically, `<mu-auth>` will
be one of the upper-most elements inside the body, since most
of the page will need access to it.

`<mu-auth>` accepts a `provides=` attribute, which
serves as the key by which other components will
be able to observe the auth state.

```html
<body>
  <mu-auth provides="my:auth">
    <!-- page content here -->
  </mu-auth>
</body>
```

An additional attribute, `redirect=`, specifies the URL
of the login page. In conjunction with the `auth/redirect`
message, this allows redirection to a login page for pages
which require authentication.

## `Auth.Model`

This interface describes the state maintained by `Auth.Provider`.

```ts
interface AuthModel {
  user?: APIUser | AuthenticatedUser;
}

interface APIUser {
  authenticated: boolean;
  username: string;
}

interface AuthenticatedUser extends APIUser {
  token: string;
}
```

## `Observer<Auth.Model>`

Following the **Observer** pattern, any component descendent
from `<mu-auth>` can access the state of the `Auth.Provider`.
An observer is typically built as part of the component's constructor, but observations cannot be requested until the component is in the DOM tree which contains the `<mu-auth>` element.

```ts
class MyObserver extends HTMLElement {
  loggedIn = false;
  userid?: string;
  _authObserver =
    new Observer<Auth.Model>(this, "my:auth");

  connectedCallback() {
    this._authObserver.observe(
      (auth: Auth.Model) => {
        const { user } = auth;
        this.loggedIn = user.authenticated;
        this.userid = user.username;
      }
    );
  }
}
```

## `Auth.headers`

This function simplifies creation of `Authorization` headers based on the data available from the `Auth.Provider`.

```ts
function headers(
  user: APIUser | AuthenticatedUser
): { Authorization?: string }
```

## `Auth.payload`

This function provides access to the payload of the JWT token
received when the user logged in. This allows access to other
fields which the server may provide, such as roles.

```ts
function payload(
  user: APIUser | AuthenticatedUser
): object
```

## Message interface

`Auth.Provider` listens for messages&mdash;implemented as
custom events of type `auth:message`&mdash; which allow other components to request
operations on the provider.

```ts
interface AuthSuccessful {
  token: string;
  redirect?: string;
}

type AuthMsg =
  | ["auth/signin", AuthSuccessful]
  | ["auth/signout"]
  | ["auth/redirect"];
```

### `auth/signin`

Upon successful signin, an `auth/signin` message should be dispatched with the token in the payload of the message.
`Auth.Provider` will use the token to build a new `Auth.Model`.

The token is also maintained in the browser's `localStorage`,
so that page reloads do not require re-authentication.
`Auth.Provider` checks for an existing token in `localStorage`
upon initialization, and recreates the `Auth.Model` accordingly.

If `redirect` is set, the user will be redirected to that page
after the token is stored in `localStorage`.

### `auth/signout`

Upon receiving this message, `Auth.Provider` will clear the
`Auth.Model` and drop the current token from `localStorage`,
effectively logging out the user.

### `auth/redirect`

This message can be used to force a redirection to the
login page. The current location is added as `?next=` in the query
string so that subsequent `auth/signin` message can redirect
the user back to the original page.
