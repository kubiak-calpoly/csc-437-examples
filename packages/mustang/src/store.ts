import {
  Context,
  ContextProvider,
  createContext,
  provide
} from "@lit/context";
import { LitElement } from "lit";
import { ObservableElement } from "./observer";
import { ModelMap, TypedMessage, Update } from "./update";

export class ModelProvider<
  M extends object
> extends ObservableElement<M> {
  get model() {
    return this.subject;
  }

  constructor(init: M) {
    super(init);
  }
}

export class Store<
  M extends object,
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
    }
  }
}
