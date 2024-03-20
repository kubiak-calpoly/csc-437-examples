const EVENT_PREFIX = "mu:observe";
const OBSERVABLE_CHANGE_EVENT = `${EVENT_PREFIX}:change`;

interface ObserverConnectionRequest<T extends object> {
  accept: (
    oe: ObservableElement<T>,
    ok: ObserverConnectionAccepted
  ) => void;
  reject: (el: HTMLElement, error: string) => void;
}

interface ObserverConnectionAccepted {
  attach: (listen: EventListener) => void;
}

function closestElement(
  selector: string,
  el: Element
): Element | undefined {
  return (
    (el &&
      el !== document.rootElement &&
      (el.closest(selector) ||
        (el.shadowRoot &&
          closestElement(selector, el.shadowRoot.host)))) ||
    undefined
  );
}

function whenObservableFrom<T extends object>(
  consumer: Element,
  context: string
) {
  const selector = `[provides="${context}"]`;
  const provider = closestElement(
    selector,
    consumer
  ) as ObservableElement<T>;

  return new Promise<ObservableElement<T>>(
    (resolve, reject) => {
      if (provider) {
        const name = provider.localName;
        customElements
          .whenDefined(name)
          .then(() => resolve(provider));
      } else {
        reject({
          context,
          reason: "No provider for this context"
        });
      }
    }
  );
}

export class ObservableElement<
  T extends object
> extends LitElement {
  subject: T;

  constructor(init: T) {
    super();
    const attach = (listen: EventListener) =>
      this.attach(listen);
    console.log("Constructing observable", this);
    this.subject = createObservable<T>(init, this);
  }

  attach(observer: EventListener) {
    this.addEventListener(OBSERVABLE_CHANGE_EVENT, observer);
    return observer;
  }

  detach(observer: EventListener) {
    this.removeEventListener(OBSERVABLE_CHANGE_EVENT, observer);
  }
}

export class ContextObserver<T extends object> {
  _target: HTMLElement;
  _context: string;
  _observable?: ObservableElement<T>;
  _observers: Observer<T>[] = [];

  constructor(target: HTMLElement, context: string) {
    this._target = target;
    this._context = context;
  }

  observe() {
    return new Promise<Observer<T>>((resolve, reject) => {
      if (this._observable) {
        const observer = new Observer<T>(this._observable);
        this._observers.push(observer);
        resolve(observer);
      } else {
        whenObservableFrom<T>(this._target, this._context).then(
          (oe: ObservableElement<T>) => {
            const observer = new Observer<T>(oe);
            this._observable = oe;
            this._observers.push(observer);
            oe.attach((ev: Event) =>
              this._handleChange(ev as CustomEvent)
            );
            resolve(observer);
          }
        );
      }
    });
  }

  _handleChange(ev: CustomEvent) {
    console.log(
      "Received change event for observers",
      ev,
      this._observers
    );
    this._observers.forEach((obs) => obs.runEffect());
  }
}

type SubjectAccessor<T extends object> = (subject: T) => T;
type SubjectEffect<T extends object> = (value: T) => void;

export class Observer<T extends object> {
  _observable: ObservableElement<T>;
  _effectFn?: SubjectEffect<T>;

  constructor(observable: ObservableElement<T>) {
    this._observable = observable;
  }

  get value() {
    return this._observable.subject;
  }

  setEffect(fn: SubjectEffect<T>) {
    this._effectFn = fn;
    this.runEffect();
  }

  runEffect() {
    if (this._effectFn) {
      this._effectFn(this.value);
    }
  }
}

export function createObservable<T extends object>(
  root: T,
  eventTarget: ObservableElement<T>
) {
  console.log("creating Observable:", JSON.stringify(root));

  let proxy = new Proxy<T>(root, {
    get: (target, prop: string, receiver) => {
      if (prop === "then") {
        return undefined;
      }
      const value = Reflect.get(target, prop, receiver);
      console.log(
        `Observable['${prop}'] => ${JSON.stringify(value)}`
      );
      return value;
    },
    set: (target, prop: string, newValue, receiver) => {
      const oldValue = root[prop as keyof T];
      console.log(
        `Observable['${prop.toString()}'] <= ${JSON.stringify(
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
        let evt = new CustomEvent(OBSERVABLE_CHANGE_EVENT, {
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
          `Observable['${prop}] was not set to ${newValue}`
        );
      }
      return didSet;
    }
  });

  return proxy;
}
