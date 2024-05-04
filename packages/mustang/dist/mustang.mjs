class c extends Error {
}
c.prototype.name = "InvalidTokenError";
function y(n) {
  return decodeURIComponent(atob(n).replace(/(.)/g, (t, e) => {
    let s = e.charCodeAt(0).toString(16).toUpperCase();
    return s.length < 2 && (s = "0" + s), "%" + s;
  }));
}
function w(n) {
  let t = n.replace(/-/g, "+").replace(/_/g, "/");
  switch (t.length % 4) {
    case 0:
      break;
    case 2:
      t += "==";
      break;
    case 3:
      t += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return y(t);
  } catch {
    return atob(t);
  }
}
function x(n, t) {
  if (typeof n != "string")
    throw new c("Invalid token specified: must be a string");
  t || (t = {});
  const e = t.header === !0 ? 0 : 1, s = n.split(".")[e];
  if (typeof s != "string")
    throw new c(`Invalid token specified: missing part #${e + 1}`);
  let o;
  try {
    o = w(s);
  } catch (r) {
    throw new c(`Invalid token specified: invalid base64 for part #${e + 1} (${r.message})`);
  }
  try {
    return JSON.parse(o);
  } catch (r) {
    throw new c(`Invalid token specified: invalid json for part #${e + 1} (${r.message})`);
  }
}
const b = "mu:context", d = `${b}:change`;
class T {
  constructor(t, e) {
    this._proxy = _(t, e);
  }
  get value() {
    return this._proxy;
  }
  set value(t) {
    Object.assign(this._proxy, t);
  }
  apply(t) {
    this.value = t(this.value);
  }
}
class S extends HTMLElement {
  constructor(t) {
    super(), console.log("Constructing context", this), this.context = new T(t, this);
  }
  attach(t) {
    return this.addEventListener(d, t), t;
  }
  detach(t) {
    this.removeEventListener(d, t);
  }
}
function _(n, t) {
  return console.log("creating Context:", JSON.stringify(n)), new Proxy(n, {
    get: (s, o, r) => {
      if (o === "then")
        return;
      const i = Reflect.get(s, o, r);
      return console.log(
        `Context['${o}'] => ${JSON.stringify(i)}`
      ), i;
    },
    set: (s, o, r, i) => {
      const p = n[o];
      console.log(
        `Context['${o.toString()}'] <= ${JSON.stringify(
          r
        )}; was ${JSON.stringify(p)}`
      );
      const f = Reflect.set(
        s,
        o,
        r,
        i
      );
      if (f) {
        let h = new CustomEvent(d, {
          bubbles: !0,
          cancelable: !0,
          composed: !0
        });
        Object.assign(h, {
          property: o,
          oldValue: p,
          value: r
        }), t.dispatchEvent(h), console.log(
          "dispatched event to target",
          h,
          t
        );
      } else
        console.log(
          `Context['${o}] was not set to ${r}`
        );
      return f;
    }
  });
}
class C extends CustomEvent {
  constructor(t, e = "mu:message") {
    super(e, {
      bubbles: !0,
      composed: !0,
      detail: t
    });
  }
}
function $(n) {
  return (t, ...e) => t.dispatchEvent(new C(e, n));
}
class N {
  attach(t) {
    t.addEventListener(this._eventType, (e) => {
      e.stopPropagation();
      const s = e.detail;
      this.consume(s);
    });
  }
  constructor(t, e, s = "service:message") {
    this._context = e, this._update = t, this._eventType = s;
  }
  apply(t) {
    this._context.apply(t);
  }
  consume(t) {
    this._update(
      t,
      this.apply.bind(this),
      this._context.value
    );
  }
}
function m(n) {
  return n;
}
function v(n) {
  return (t) => ({ ...t, ...n });
}
const g = "mu:auth:jwt", a = class E extends N {
  constructor(t) {
    super(k, t, E.EVENT_TYPE);
  }
};
a.EVENT_TYPE = "auth:message";
a.dispatch = $(a.EVENT_TYPE);
let O = a;
const k = (n, t) => {
  switch (n[0]) {
    case "auth/signin":
      I(n[1]).then(t);
      return;
    case "auth/signup":
      P(n[1]).then(t);
      return;
    case "auth/signout":
      t(U());
      return;
    default:
      const e = n[0];
      throw new Error(`Unhandled Auth message "${e}"`);
  }
};
class j extends S {
  constructor() {
    super({ user: new u() }), new O(this.context).attach(this);
  }
}
class u {
  constructor() {
    this.authenticated = !1, this.username = "anonymous";
  }
  static deauthenticate(t) {
    return t.authenticated = !1, t.username = "anonymous", localStorage.removeItem(g), t;
  }
}
class l extends u {
  constructor(t) {
    super();
    const e = x(t);
    console.log("Token payload", e), this.token = t, this.authenticated = !0, this.username = e.username;
  }
  static authenticate(t) {
    const e = new l(t);
    return localStorage.setItem(g, t), e;
  }
  static authenticateFromLocalStorage() {
    const t = localStorage.getItem(g);
    return t ? l.authenticate(t) : new u();
  }
}
function I(n) {
  const t = window.location.origin;
  return fetch(`${t}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(n)
  }).then((e) => {
    if (e.status === 200)
      return e.json();
  }).then((e) => {
    if (e) {
      console.log("Authentication:", e.token);
      const s = l.authenticate(e.token), o = s ? e.token : "";
      return console.log("Providing auth user:", s), v({ user: s, token: o });
    } else
      return m;
  });
}
function P(n) {
  const t = window.location.origin;
  return fetch(`${t}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(n)
  }).then((e) => {
    if (e.status === 200)
      return e.json();
  }).then((e) => (console.log("Registration:", e), m));
}
function U() {
  return v({ user: new u(), token: "" });
}
function A(n) {
  Object.entries(n).map(
    ([t, e]) => customElements.define(t, e)
  );
}
export {
  u as APIUser,
  j as AuthElement,
  O as AuthService,
  l as AuthenticatedUser,
  A as define
};
