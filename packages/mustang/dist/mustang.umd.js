(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.mu = {}));
})(this, function(exports2) {
  "use strict";
  class InvalidTokenError extends Error {
  }
  InvalidTokenError.prototype.name = "InvalidTokenError";
  function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
      let code = p.charCodeAt(0).toString(16).toUpperCase();
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
    } catch (e) {
      throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
    }
    try {
      return JSON.parse(decoded);
    } catch (e) {
      throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
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
  class Service {
    attach(host) {
      host.addEventListener(this._eventType, (ev) => {
        ev.stopPropagation();
        const message = ev.detail;
        this.consume(message);
      });
    }
    constructor(update, context, eventType = "service:message") {
      this._context = context;
      this._update = update;
      this._eventType = eventType;
    }
    apply(fn) {
      this._context.apply(fn);
    }
    consume(message) {
      const command = this._update(
        message,
        this.apply.bind(this),
        this._context.value
      );
      if (command)
        command(this._context.value);
    }
  }
  function replace(replacements) {
    return (model) => ({ ...model, ...replacements });
  }
  const TOKEN_KEY = "mu:auth:jwt";
  const _AuthService = class _AuthService2 extends Service {
    constructor(context, redirectForLogin) {
      super(
        (m, a) => this.update(m, a),
        context,
        _AuthService2.EVENT_TYPE
      );
      this._redirectForLogin = redirectForLogin;
    }
    update(message, apply) {
      switch (message[0]) {
        case "auth/signin":
          const { token, redirect } = message[1];
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
          const unhandled = message[0];
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
      ([k, v]) => target.searchParams.set(k, v)
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
  const auth = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    AuthenticatedUser,
    Provider: AuthProvider,
    User: APIUser
  }, Symbol.toStringTag, { value: "Module" }));
  const parser = new DOMParser();
  function html(template, ...params) {
    const htmlString = template.map((s, i) => i ? [params[i - 1], s] : [s]).flat().join("");
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
  function define2(defns) {
    Object.entries(defns).map(([k, v]) => {
      if (!customElements.get(k))
        customElements.define(k, v);
    });
    return customElements;
  }
  class Observer {
    constructor(target, contextLabel) {
      this._effects = [];
      this._target = target;
      this._contextLabel = contextLabel;
    }
    observe(fn) {
      return new Promise((resolve, _) => {
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
        this.form.addEventListener("submit", (event) => {
          event.preventDefault();
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
              const event2 = new CustomEvent(customType, {
                bubbles: true,
                composed: true,
                detail: {
                  method,
                  [action]: json,
                  url: src
                }
              });
              this.dispatchEvent(event2);
            });
          }
        });
      }
      this.addEventListener("change", (event) => {
        const target = event.target;
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
      var _a;
      return (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("form");
    }
    get authorization() {
      var _a;
      if ((_a = this._user) == null ? void 0 : _a.authenticated) {
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
  exports2.Auth = auth;
  exports2.DropdownElement = DropdownElement;
  exports2.Effect = Effect;
  exports2.Observer = Observer;
  exports2.Rest = rest;
  exports2.define = define2;
  exports2.html = html;
  exports2.shadow = shadow;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
