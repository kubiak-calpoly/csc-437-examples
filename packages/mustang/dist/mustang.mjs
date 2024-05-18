var _a;
class InvalidTokenError extends Error {
}
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, (m2, p2) => {
    let code = p2.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = "0" + code;
    }
    return "%" + code;
  }));
}
function base64UrlDecode(str) {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}
function jwtDecode(token, options) {
  if (typeof token !== "string") {
    throw new InvalidTokenError("Invalid token specified: must be a string");
  }
  options || (options = {});
  const pos = options.header === true ? 0 : 1;
  const part = token.split(".")[pos];
  if (typeof part !== "string") {
    throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
  }
  let decoded;
  try {
    decoded = base64UrlDecode(part);
  } catch (e2) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e2.message})`);
  }
  try {
    return JSON.parse(decoded);
  } catch (e2) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e2.message})`);
  }
}
const EVENT_PREFIX = "mu:context";
const CONTEXT_CHANGE_EVENT = `${EVENT_PREFIX}:change`;
class Context {
  constructor(init, host) {
    this._proxy = createContext(init, host);
  }
  get value() {
    return this._proxy;
  }
  set value(next) {
    Object.assign(this._proxy, next);
  }
  apply(mapFn) {
    this.value = mapFn(this.value);
  }
}
class Provider extends HTMLElement {
  constructor(init) {
    super();
    console.log("Constructing context provider", this);
    this.context = new Context(init, this);
    this.style.display = "contents";
  }
  attach(observer) {
    this.addEventListener(CONTEXT_CHANGE_EVENT, observer);
    return observer;
  }
  detach(observer) {
    this.removeEventListener(CONTEXT_CHANGE_EVENT, observer);
  }
}
function createContext(root, eventTarget) {
  let proxy = new Proxy(root, {
    get: (target, prop, receiver) => {
      if (prop === "then") {
        return void 0;
      }
      const value = Reflect.get(target, prop, receiver);
      console.log(
        `Context['${prop}'] => ${JSON.stringify(value)}`
      );
      return value;
    },
    set: (target, prop, newValue, receiver) => {
      const oldValue = root[prop];
      console.log(
        `Context['${prop.toString()}'] <= ${JSON.stringify(
          newValue
        )}; was ${JSON.stringify(oldValue)}`
      );
      const didSet = Reflect.set(
        target,
        prop,
        newValue,
        receiver
      );
      if (didSet) {
        let evt = new CustomEvent(CONTEXT_CHANGE_EVENT, {
          bubbles: true,
          cancelable: true,
          composed: true
        });
        Object.assign(evt, {
          property: prop,
          oldValue,
          value: newValue
        });
        eventTarget.dispatchEvent(evt);
      } else {
        console.log(
          `Context['${prop}] was not set to ${newValue}`
        );
      }
      return didSet;
    }
  });
  return proxy;
}
function whenProviderReady(consumer, contextLabel) {
  const provider = closestProvider(
    contextLabel,
    consumer
  );
  return new Promise((resolve, reject) => {
    if (provider) {
      const name = provider.localName;
      customElements.whenDefined(name).then(() => resolve(provider));
    } else {
      reject({
        context: contextLabel,
        reason: `No provider for this context "${contextLabel}:`
      });
    }
  });
}
function closestProvider(contextLabel, el) {
  const selector = `[provides="${contextLabel}"]`;
  if (!el || el === document.getRootNode())
    return void 0;
  const closest = el.closest(selector);
  if (closest)
    return closest;
  const root = el.getRootNode();
  if (root instanceof ShadowRoot)
    return closestProvider(contextLabel, root.host);
  return void 0;
}
class Dispatch extends CustomEvent {
  constructor(msg, eventType = "mu:message") {
    super(eventType, {
      bubbles: true,
      composed: true,
      detail: msg
    });
  }
}
function dispatcher(eventType) {
  return (target, ...msg) => target.dispatchEvent(new Dispatch(msg, eventType));
}
const message = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Dispatch,
  dispatcher
}, Symbol.toStringTag, { value: "Module" }));
class Service {
  constructor(update2, context, eventType = "service:message") {
    this._running = false;
    this._pending = [];
    this._context = context;
    this._update = update2;
    this._eventType = eventType;
  }
  attach(host) {
    host.addEventListener(this._eventType, (ev) => {
      ev.stopPropagation();
      const message2 = ev.detail;
      this.consume(message2);
    });
  }
  start() {
    if (!this._running) {
      console.log(`Starting ${this._eventType} service`);
      this._running = true;
      this._pending.forEach((msg) => this.process(msg));
    }
  }
  apply(fn) {
    this._context.apply(fn);
  }
  consume(message2) {
    if (this._running) {
      this.process(message2);
    } else {
      console.log(
        `Queueing ${this._eventType} message`,
        message2
      );
      this._pending.push(message2);
    }
  }
  process(message2) {
    console.log(
      `Processing ${this._eventType} message`,
      message2
    );
    const command = this._update(
      message2,
      this.apply.bind(this)
    );
    if (command)
      command(this._context.value);
  }
}
function identity(model) {
  return model;
}
function replace(replacements) {
  return (model) => ({ ...model, ...replacements });
}
const update = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity,
  replace
}, Symbol.toStringTag, { value: "Module" }));
const TOKEN_KEY = "mu:auth:jwt";
const _AuthService = class _AuthService2 extends Service {
  constructor(context, redirectForLogin) {
    super(
      (m2, a2) => this.update(m2, a2),
      context,
      _AuthService2.EVENT_TYPE
    );
    this._redirectForLogin = redirectForLogin;
  }
  update(message2, apply) {
    switch (message2[0]) {
      case "auth/signin":
        const { token, redirect } = message2[1];
        apply(signIn(token));
        return redirection(redirect);
      case "auth/signout":
        apply(signOut());
        return redirection(this._redirectForLogin);
      case "auth/redirect":
        apply(signOut());
        return redirection(this._redirectForLogin, {
          next: window.location.href
        });
      default:
        const unhandled = message2[0];
        throw new Error(
          `Unhandled Auth message "${unhandled}"`
        );
    }
  }
};
_AuthService.EVENT_TYPE = "auth:message";
_AuthService.dispatch = dispatcher(_AuthService.EVENT_TYPE);
let AuthService = _AuthService;
function redirection(redirect, query = {}) {
  if (!redirect)
    return void 0;
  const base = window.location.href;
  const target = new URL(redirect, base);
  Object.entries(query).forEach(
    ([k2, v2]) => target.searchParams.set(k2, v2)
  );
  return () => {
    console.log("Redirecting to ", redirect);
    window.location.assign(target);
  };
}
class AuthProvider extends Provider {
  get redirect() {
    return this.getAttribute("redirect") || void 0;
  }
  constructor() {
    super({
      user: AuthenticatedUser.authenticateFromLocalStorage()
    });
  }
  connectedCallback() {
    const service = new AuthService(
      this.context,
      this.redirect
    );
    service.attach(this);
  }
}
class APIUser {
  constructor() {
    this.authenticated = false;
    this.username = "anonymous";
  }
  static deauthenticate(user) {
    user.authenticated = false;
    user.username = "anonymous";
    localStorage.removeItem(TOKEN_KEY);
    return user;
  }
}
class AuthenticatedUser extends APIUser {
  constructor(token) {
    super();
    const jsonPayload = jwtDecode(token);
    console.log("Token payload", jsonPayload);
    this.token = token;
    this.authenticated = true;
    this.username = jsonPayload.username;
  }
  static authenticate(token) {
    const authenticatedUser = new AuthenticatedUser(token);
    localStorage.setItem(TOKEN_KEY, token);
    return authenticatedUser;
  }
  static authenticateFromLocalStorage() {
    const priorToken = localStorage.getItem(TOKEN_KEY);
    return priorToken ? AuthenticatedUser.authenticate(priorToken) : new APIUser();
  }
}
function signIn(token) {
  return replace({
    user: AuthenticatedUser.authenticate(token),
    token
  });
}
function signOut() {
  return (model) => {
    const oldUser = model.user;
    return {
      user: oldUser && oldUser.authenticated ? APIUser.deauthenticate(oldUser) : oldUser,
      token: ""
    };
  };
}
function authHeaders(user) {
  if (user.authenticated) {
    const authUser = user;
    return {
      Authorization: `Bearer ${authUser.token || "NO_TOKEN"}`
    };
  } else {
    return {};
  }
}
const auth = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AuthenticatedUser,
  Provider: AuthProvider,
  User: APIUser,
  headers: authHeaders
}, Symbol.toStringTag, { value: "Module" }));
const parser = new DOMParser();
function html(template, ...params) {
  const htmlString = template.map((s2, i2) => i2 ? [params[i2 - 1], s2] : [s2]).flat().join("");
  const doc = parser.parseFromString(htmlString, "text/html");
  const collection = doc.head.childElementCount ? doc.head.children : doc.body.children;
  const fragment = new DocumentFragment();
  fragment.replaceChildren(...collection);
  return fragment;
}
function shadow(fragment) {
  const first = fragment.firstElementChild;
  const template = first && first.tagName === "TEMPLATE" ? first : void 0;
  return { attach };
  function attach(el, options = { mode: "open" }) {
    const shadow2 = el.attachShadow(options);
    if (template)
      shadow2.appendChild(template.content.cloneNode(true));
    return shadow2;
  }
}
const _DropdownElement = class _DropdownElement2 extends HTMLElement {
  constructor() {
    super();
    shadow(_DropdownElement2.template).attach(this);
    if (this.shadowRoot) {
      const actuator = this.shadowRoot.querySelector(
        "slot[name='actuator']"
      );
      if (actuator)
        actuator.addEventListener("click", () => this.toggle());
    }
  }
  toggle() {
    if (this.hasAttribute("open"))
      this.removeAttribute("open");
    else
      this.setAttribute("open", "open");
  }
};
_DropdownElement.template = html`<template>
    <slot name="actuator"><button> Menu </button></slot>
    <div id="panel">
      <slot></slot>
    </div>

    <style>
      :host {
        position: relative;
      }
      #is-shown {
        display: none;
      }
      #panel {
        display: none;

        position: absolute;
        right: 0;
        margin-top: var(--size-spacing-small);
        width: max-content;
        padding: var(--size-spacing-small);
        border-radius: var(--size-radius-small);
        background: var(--color-background-card);
        color: var(--color-text);
        box-shadow: var(--shadow-popover);
      }
      :host([open]) #panel {
        display: block;
      }
    </style>
  </template>`;
let DropdownElement = _DropdownElement;
function define(defns) {
  Object.entries(defns).map(([k2, v2]) => {
    if (!customElements.get(k2))
      customElements.define(k2, v2);
  });
  return customElements;
}
function relay(event2, customType, detail) {
  const relay2 = event2.currentTarget;
  const customEvent = new CustomEvent(customType, {
    bubbles: true,
    composed: true,
    detail
  });
  console.log(
    `Relaying event from ${event2.type}:`,
    customEvent
  );
  relay2.dispatchEvent(customEvent);
  event2.stopPropagation();
}
const event = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  relay
}, Symbol.toStringTag, { value: "Module" }));
class Observer {
  constructor(target, contextLabel) {
    this._effects = [];
    this._target = target;
    this._contextLabel = contextLabel;
  }
  observe(fn = void 0) {
    return new Promise((resolve, _2) => {
      if (this._provider) {
        const effect = new Effect(this._provider, fn);
        this._effects.push(effect);
        resolve(effect);
      } else {
        whenProviderReady(this._target, this._contextLabel).then((provider) => {
          const effect = new Effect(provider, fn);
          this._provider = provider;
          this._effects.push(effect);
          provider.attach(
            (ev) => this._handleChange(ev)
          );
          resolve(effect);
        }).catch(
          (err) => console.log(
            `Observer ${this._contextLabel} failed to locate a provider`,
            err
          )
        );
      }
    });
  }
  _handleChange(ev) {
    console.log(
      "Received change event for observers",
      ev,
      this._effects
    );
    this._effects.forEach((obs) => obs.runEffect());
  }
}
class Effect {
  constructor(observable, fn) {
    this._provider = observable;
    if (fn)
      this.setEffect(fn);
  }
  get context() {
    return this._provider.context;
  }
  get value() {
    return this.context.value;
  }
  setEffect(fn) {
    this._effectFn = fn;
    this.runEffect();
  }
  runEffect() {
    if (this._effectFn) {
      this._effectFn(this.context.value);
    }
  }
}
const _FormElement = class _FormElement2 extends HTMLElement {
  constructor() {
    super();
    this._state = {};
    this._user = new APIUser();
    this._authObserver = new Observer(
      this,
      "blazing:auth"
    );
    shadow(_FormElement2.template).attach(this);
    if (this.form) {
      this.form.addEventListener("submit", (event2) => {
        event2.preventDefault();
        if (this.src) {
          console.log("Submitting form", this._state);
          const method = this.isNew ? "POST" : "PUT";
          const action = this.isNew ? "created" : "updated";
          const src = this.isNew ? this.src.replace(/[/][$]new$/, "") : this.src;
          submitForm(
            src,
            this._state,
            method,
            this.authorization
          ).then((json) => populateForm(json, this)).then((json) => {
            const customType = `mu-rest-form:${action}`;
            const event22 = new CustomEvent(customType, {
              bubbles: true,
              composed: true,
              detail: {
                method,
                [action]: json,
                url: src
              }
            });
            this.dispatchEvent(event22);
          });
        }
      });
    }
    this.addEventListener("change", (event2) => {
      const target = event2.target;
      if (target) {
        const name = target.name;
        const value = target.value;
        if (name)
          this._state[name] = value;
      }
    });
  }
  get src() {
    return this.getAttribute("src");
  }
  get isNew() {
    return this.hasAttribute("new");
  }
  get form() {
    var _a2;
    return (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("form");
  }
  get authorization() {
    var _a2;
    if ((_a2 = this._user) == null ? void 0 : _a2.authenticated) {
      const user = this._user;
      return { Authorization: `Bearer ${user.token}` };
    } else {
      return {};
    }
  }
  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
        if (this.src) {
          fetchData(this.src, this.authorization).then(
            (json) => {
              this._state = json;
              populateForm(json, this);
            }
          );
        }
      }
    });
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src":
        if (this.src && newValue && newValue !== oldValue && !this.isNew) {
          fetchData(this.src, this.authorization).then(
            (json) => {
              this._state = json;
              populateForm(json, this);
            }
          );
        }
        break;
      case "new":
        if (newValue) {
          this._state = {};
          populateForm({}, this);
        }
        break;
    }
  }
};
_FormElement.observedAttributes = ["src", "new"];
_FormElement.template = html`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot><button type="submit">Submit</button></slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;
let FormElement = _FormElement;
function fetchData(src, authorization) {
  return fetch(src, { headers: authorization }).then((response) => {
    if (response.status !== 200) {
      throw `Status: ${response.status}`;
    }
    return response.json();
  }).catch(
    (error) => console.log(`Failed to load form from ${src}:`, error)
  );
}
function populateForm(json, formBody) {
  const entries = Object.entries(json);
  for (const [key, val] of entries) {
    const el = formBody.querySelector(`[name="${key}"]`);
    if (el) {
      const input = el;
      switch (input.type) {
        case "checkbox":
          const checkbox = input;
          checkbox.checked = Boolean(val);
          break;
        default:
          input.value = val;
          break;
      }
    }
  }
  return json;
}
function submitForm(src, json, method = "PUT", authorization = {}) {
  return fetch(src, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authorization
    },
    body: JSON.stringify(json)
  }).then((res) => {
    if (res.status != 200 && res.status != 201)
      throw `Form submission failed: Status ${res.status}`;
    return res.json();
  }).catch((err) => console.log("Error submitting form:", err));
}
const rest = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FormElement,
  fetchData
}, Symbol.toStringTag, { value: "Module" }));
const _StoreService = class _StoreService2 extends Service {
  constructor(context, updateFn) {
    super(updateFn, context, _StoreService2.EVENT_TYPE);
  }
};
_StoreService.EVENT_TYPE = "mu:message";
let StoreService = _StoreService;
class StoreProvider extends Provider {
  constructor(update2, init, authContext) {
    super(init);
    this._user = new APIUser();
    this._updateFn = update2;
    this._authObserver = new Observer(
      this,
      authContext
    );
  }
  connectedCallback() {
    const service = new StoreService(
      this.context,
      (msg, apply) => this._updateFn(msg, apply, this._user)
    );
    service.attach(this);
    this._authObserver.observe(({ user }) => {
      console.log("Store got auth", user);
      if (user)
        this._user = user;
      service.start();
    });
  }
}
const store = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Provider: StoreProvider,
  Service: StoreService
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis, e$2 = t$1.ShadowRoot && (void 0 === t$1.ShadyCSS || t$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$3 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$2 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$3.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$3.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), S$1 = (s2, o2) => {
  if (e$2)
    s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else
    for (const e2 of o2) {
      const o3 = document.createElement("style"), n3 = t$1.litNonce;
      void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
    }
}, c$2 = e$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return r$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$1, defineProperty: e$1, getOwnPropertyDescriptor: r$3, getOwnPropertyNames: h$1, getOwnPropertySymbols: o$2, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$1 = (t2, s2) => !i$1(t2, s2), y = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class b extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = y) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), r2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== r2 && e$1(this.prototype, t2, r2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: h2 } = r$3(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get() {
      return e2 == null ? void 0 : e2.call(this);
    }, set(s3) {
      const r2 = e2 == null ? void 0 : e2.call(this);
      h2.call(this, s3), this.requestUpdate(t2, r2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties")))
      return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized")))
      return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...h$1(t3), ...o$2(t3)];
      for (const i2 of s2)
        this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2)
        for (const [t3, i2] of s2)
          this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2)
        i2.unshift(c$2(s3));
    } else
      void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys())
      this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$EC(t2, s2) {
    var _a2;
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const r2 = (void 0 !== ((_a2 = i2.converter) == null ? void 0 : _a2.toAttribute) ? i2.converter : u$1).toAttribute(s2, i2.type);
      this._$Em = t2, null == r2 ? this.removeAttribute(e2) : this.setAttribute(e2, r2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2;
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), r2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$1;
      this._$Em = e2, this[e2] = r2.fromAttribute(s2, t3.type), this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2) {
    if (void 0 !== t2) {
      if (i2 ?? (i2 = this.constructor.getPropertyOptions(t2)), !(i2.hasChanged ?? f$1)(this[t2], s2))
        return;
      this.P(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t2, s2, i2) {
    this._$AL.has(t2) || this._$AL.set(t2, s2), true === i2.reflect && this._$Em !== t2 && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t2);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep)
          this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0)
        for (const [s3, i2] of t3)
          true !== i2.wrapped || this._$AL.has(s3) || void 0 === this[s3] || this.P(s3, this[s3], i2);
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s2)) : this._$EU();
    } catch (s3) {
      throw t2 = false, this._$EU(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t3) => this._$EC(t3, this[t3]))), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d$1("elementProperties")] = /* @__PURE__ */ new Map(), b[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1 == null ? void 0 : p$1({ ReactiveElement: b }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis, i = t.trustedTypes, s$1 = i ? i.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e = "$lit$", h = `lit$${Math.random().toFixed(9).slice(2)}$`, o$1 = "?" + h, n$1 = `<${o$1}>`, r$2 = document, l = () => r$2.createComment(""), c = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a = Array.isArray, u = (t2) => a(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), d = "[ 	\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, _ = />/g, m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, w = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), E = r$2.createTreeWalker(r$2, 129);
function C(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== s$1 ? s$1.createHTML(i2) : i2;
}
const P = (t2, i2) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i2 ? "<svg>" : "", c2 = f;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, y2 = 0;
    for (; y2 < s3.length && (c2.lastIndex = y2, u2 = c2.exec(s3), null !== u2); )
      y2 = c2.lastIndex, c2 === f ? "!--" === u2[1] ? c2 = v : void 0 !== u2[1] ? c2 = _ : void 0 !== u2[2] ? ($.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m) : void 0 !== u2[3] && (c2 = m) : c2 === m ? ">" === u2[0] ? (c2 = r2 ?? f, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m : '"' === u2[3] ? g : p) : c2 === g || c2 === p ? c2 = m : c2 === v || c2 === _ ? c2 = f : (c2 = m, r2 = void 0);
    const x = c2 === m && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f ? s3 + n$1 : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e + s3.slice(d2) + h + x) : s3 + h + (-2 === d2 ? i3 : x);
  }
  return [C(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : "")), o2];
};
class V {
  constructor({ strings: t2, _$litType$: s2 }, n3) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = P(t2, s2);
    if (this.el = V.createElement(f2, n3), E.currentNode = this.el.content, 2 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = E.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes())
          for (const t3 of r2.getAttributeNames())
            if (t3.endsWith(e)) {
              const i2 = v2[a2++], s3 = r2.getAttribute(t3).split(h), e2 = /([.?@])?(.*)/.exec(i2);
              d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: "." === e2[1] ? k : "?" === e2[1] ? H : "@" === e2[1] ? I : R }), r2.removeAttribute(t3);
            } else
              t3.startsWith(h) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($.test(r2.tagName)) {
          const t3 = r2.textContent.split(h), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i ? i.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              r2.append(t3[i2], l()), E.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s3], l());
          }
        }
      } else if (8 === r2.nodeType)
        if (r2.data === o$1)
          d2.push({ type: 2, index: c2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = r2.data.indexOf(h, t3 + 1)); )
            d2.push({ type: 7, index: c2 }), t3 += h.length - 1;
        }
      c2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = r$2.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function N(t2, i2, s2 = t2, e2) {
  var _a2, _b;
  if (i2 === w)
    return i2;
  let h2 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = c(i2) ? void 0 : i2._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = N(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class S {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? r$2).importNode(i2, true);
    E.currentNode = e2;
    let h2 = E.nextNode(), o2 = 0, n3 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i3;
        2 === l2.type ? i3 = new M(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i3 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i3 = new L(h2, this, t2)), this._$AV.push(i3), l2 = s2[++n3];
      }
      o2 !== (l2 == null ? void 0 : l2.index) && (h2 = E.nextNode(), o2++);
    }
    return E.currentNode = r$2, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class M {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = N(this, t2, i2), c(t2) ? t2 === T || null == t2 || "" === t2 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t2 !== this._$AH && t2 !== w && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u(t2) ? this.k(t2) : this._(t2);
  }
  S(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.S(t2));
  }
  _(t2) {
    this._$AH !== T && c(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r$2.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = V.createElement(C(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2)
      this._$AH.p(i2);
    else {
      const t3 = new S(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = A.get(t2.strings);
    return void 0 === i2 && A.set(t2.strings, i2 = new V(t2)), i2;
  }
  k(t2) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2)
      e2 === i2.length ? i2.push(s2 = new M(this.S(l()), this.S(l()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2)
      t2 = N(this, t2, i2, 0), o2 = !c(t2) || t2 !== this._$AH && t2 !== w, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++)
        r2 = N(this, e3[s2 + n3], i2, n3), r2 === w && (r2 = this._$AH[n3]), o2 || (o2 = !c(r2) || r2 !== this._$AH[n3]), r2 === T ? t2 = T : t2 !== T && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class k extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === T ? void 0 : t2;
  }
}
class H extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== T);
  }
}
class I extends R {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = N(this, t2, i2, 0) ?? T) === w)
      return;
    const s2 = this._$AH, e2 = t2 === T && s2 !== T || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== T && (s2 === T || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    N(this, t2);
  }
}
const Z = t.litHtmlPolyfillSupport;
Z == null ? void 0 : Z(V, M), (t.litHtmlVersions ?? (t.litHtmlVersions = [])).push("3.1.3");
const j = (t2, i2, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new M(i2.insertBefore(l(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class s extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = j(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return w;
  }
}
s._$litElement$ = true, s["finalized"] = true, (_a = globalThis.litElementHydrateSupport) == null ? void 0 : _a.call(globalThis, { LitElement: s });
const r$1 = globalThis.litElementPolyfillSupport;
r$1 == null ? void 0 : r$1({ LitElement: s });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.5");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2);
    }, init(e3) {
      return void 0 !== e3 && this.P(o2, void 0, t2), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, r2 ? { ...t3, wrapped: true } : t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
class View extends s {
  constructor(context) {
    super();
    this._observer = new Observer(this, context);
  }
  get model() {
    this._lastModel = this._context ? this._context.value : {};
    return this._lastModel;
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback();
    (_a2 = this._observer) == null ? void 0 : _a2.observe().then((effect) => {
      console.log("View effect (initial)", effect);
      this._context = effect.context;
      effect.setEffect(() => {
        console.log("View effect", effect, this._context);
        if (this._context) {
          console.log("requesting update");
          this.requestUpdate();
        } else {
          throw "View context not ready for effect";
        }
      });
    });
  }
  dispatchMessage(msg, target = this) {
    const ev = new CustomEvent("mu:message", {
      bubbles: true,
      composed: true,
      detail: msg
    });
    target.dispatchEvent(ev);
  }
  ref(key) {
    return this.model ? this.model[key] : void 0;
  }
}
__decorateClass([
  n2()
], View.prototype, "model", 1);
export {
  auth as Auth,
  DropdownElement,
  Effect,
  event as Events,
  message as Message,
  Observer,
  rest as Rest,
  store as Store,
  update as Update,
  View,
  define,
  html,
  shadow
};
