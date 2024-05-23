const EVENT_PREFIX = "mu:context";
const CONTEXT_CHANGE_EVENT = `${EVENT_PREFIX}:change`;

export class Context<T extends object> {
  _proxy: T;

  constructor(init: T, host: Provider<T>) {
    this._proxy = createContext<T>(init, host);
  }

  get value() {
    return this._proxy;
  }

  set value(next: T) {
    Object.assign(this._proxy, next);
  }

  apply(mapFn: (t: T) => T) {
    this.value = mapFn(this.value);
  }
}

export class Provider<T extends object> extends HTMLElement {
  readonly context: Context<T>;

  constructor(init: T) {
    super();
    console.log("Constructing context provider", this);
    this.context = new Context<T>(init, this);
    this.style.display = "contents";
  }

  attach(observer: EventListener) {
    this.addEventListener(CONTEXT_CHANGE_EVENT, observer);
    return observer;
  }

  detach(observer: EventListener) {
    this.removeEventListener(CONTEXT_CHANGE_EVENT, observer);
  }
}

export function createContext<T extends object>(
  root: T,
  eventTarget: Provider<T>
): T {
  let proxy = new Proxy<T>(root, {
    get: (target, prop: string, receiver) => {
      if (prop === "then") {
        return undefined;
      }
      const value = Reflect.get(target, prop, receiver);
      console.log(`Context['${prop}'] => `, value);
      return value;
    },
    set: (target, prop: string, newValue, receiver) => {
      const oldValue = root[prop as keyof T];
      console.log(
        `Context['${prop.toString()}'] <= `,
        newValue
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

export function whenProviderReady<T extends object>(
  consumer: Element,
  contextLabel: string
) {
  const provider = closestProvider(
    contextLabel,
    consumer
  ) as Provider<T>;

  return new Promise<Provider<T>>((resolve, reject) => {
    if (provider) {
      const name = provider.localName;
      customElements
        .whenDefined(name)
        .then(() => resolve(provider));
    } else {
      reject({
        context: contextLabel,
        reason: `No provider for this context "${contextLabel}:`
      });
    }
  });
}

function closestProvider(
  contextLabel: string,
  el: Element
): Element | undefined {
  const selector = `[provides="${contextLabel}"]`;

  if (!el || el === document.getRootNode()) return undefined;

  const closest = el.closest(selector);

  if (closest) return closest;

  const root = el.getRootNode();

  if (root instanceof ShadowRoot)
    return closestProvider(contextLabel, root.host);

  return undefined;
}
