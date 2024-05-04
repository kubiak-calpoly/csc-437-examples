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
    console.log("Constructing context", this);
    this.context = new Context(init, this);
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
  console.log("creating Context:", JSON.stringify(root));
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
        console.log(
          "dispatched event to target",
          evt,
          eventTarget
        );
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
  constructor(update2, context, eventType = "service:message") {
    this._context = context;
    this._update = update2;
    this._eventType = eventType;
  }
  apply(fn) {
    this._context.apply(fn);
  }
  consume(message) {
    this._update(
      message,
      this.apply.bind(this),
      this._context.value
    );
  }
}
function replace(replacements) {
  return (model) => ({ ...model, ...replacements });
}
const TOKEN_KEY = "mu:auth:jwt";
const _AuthService = class _AuthService2 extends Service {
  constructor(context) {
    super(update, context, _AuthService2.EVENT_TYPE);
  }
};
_AuthService.EVENT_TYPE = "auth:message";
_AuthService.dispatch = dispatcher(_AuthService.EVENT_TYPE);
let AuthService = _AuthService;
const update = (message, apply) => {
  switch (message[0]) {
    case "auth/signin":
      const { token } = message[1];
      apply(signIn(token));
      return;
    case "auth/signout":
      apply(signOut());
      return;
    default:
      const unhandled = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
};
class AuthProvider extends Provider {
  constructor() {
    super({
      user: AuthenticatedUser.authenticateFromLocalStorage()
    });
    const service = new AuthService(this.context);
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
    user: new AuthenticatedUser(token),
    token
  });
}
function signOut() {
  return replace({ user: new APIUser(), token: "" });
}
const auth = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Provider: AuthProvider
}, Symbol.toStringTag, { value: "Module" }));
function define(defns) {
  Object.entries(defns).map(
    ([k, v]) => customElements.define(k, v)
  );
}
export {
  auth as Auth,
  define
};
