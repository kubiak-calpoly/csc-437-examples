import { LitElement } from "lit";
import {
  createContext,
  provide,
  Context,
  ContextProvider
} from "@lit/context";
import { ModelMap, TypedMessage, Update } from "./update";

export function getModelProvider<M>(el: HTMLElement) {
  const provider = el.closest(
    "[data-store-context]"
  ) as ModelProvider<M>;

  return provider;
}

export class ModelProvider<M> extends LitElement {
  _context = createContext<M>("mu:Store");
  _modelProvider:
    | ContextProvider<Context<string, M>>
    | undefined;

  get model() {
    return this._modelProvider?.value;
  }

  constructor(init: M) {
    super();
    this.dataset.storeContext = "mu:Store";
    this._modelProvider = new ContextProvider(this, {
      context: this._context,
      initialValue: init
    });
  }
}

export class Store<
  M,
  Msg extends TypedMessage
> extends ModelProvider<M> {
  updateFn: Update<M, Msg>;
  constructor(update: Update<M, Msg>, init: M) {
    super(init);
    this.updateFn = update;

    (this as HTMLElement).addEventListener(
      "mu:message",
      (ev: Event) => {
        const msg = (ev as CustomEvent).detail as Msg;
        console.log("Got message: ", msg);
        this.receive(msg);
      }
    );
  }

  createRenderRoot() {
    return this;
  }

  receive(msg: Msg) {
    if (this._modelProvider && this.model) {
      const next = this.updateFn(this.model, msg);
      const promise = next as Promise<ModelMap<M>>;

      if (typeof promise?.then === "function") {
        // result is a promise
        promise.then((mapFn: ModelMap<M>) => {
          if (this.model && this._modelProvider) {
            const next = mapFn(this.model);
            console.log("Updating model in Promise:", next);
            this._modelProvider.setValue(next);
          }
        });
      } else {
        console.log("Updating model:", next);
        this._modelProvider.setValue(next as M);
      }
    }
  }
}
