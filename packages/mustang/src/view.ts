import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Context } from "./context";
import * as Message from "./message";
import { Observer } from "./observer";

export class View<
  M extends object,
  Msg extends Message.Base
> extends LitElement {
  _observer?: Observer<M>;
  _context?: Context<M>;
  _lastModel?: M;

  @property()
  get model() {
    this._lastModel = this._context
      ? this._context.value
      : ({} as M);
    return this._lastModel;
  }

  constructor(context: string) {
    super();
    this._observer = new Observer<M>(this, context);
  }

  override connectedCallback() {
    super.connectedCallback();
    this._observer?.observe().then((effect) => {
      console.log("View effect (initial)", effect);
      this._context = effect.context;
      effect.setEffect(() => {
        console.log("View effect", effect, this._context);
        if (this._context) {
          console.log("requesting update");
          this.requestUpdate();
          // this._lastModel = model;
        } else {
          throw "View context not ready for effect";
        }
      });
    });
  }

  dispatchMessage(msg: Msg, target: HTMLElement = this) {
    const ev = new CustomEvent("mu:message", {
      bubbles: true,
      composed: true,
      detail: msg
    });
    target.dispatchEvent(ev);
  }

  ref<T>(key: keyof M) {
    return this.model ? (this.model[key] as T) : undefined;
  }
}
