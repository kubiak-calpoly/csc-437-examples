import { getModelProvider } from "./store";
import { ModelMap, TypedMessage, Update } from "./update";

export class View<
  M,
  Msg extends TypedMessage
> extends HTMLElement {
  _model: M | undefined;

  connectedCallback() {
    const provider = getModelProvider<M>(this);
    this._model = provider?.model;
  }

  dispatchMessage(msg: Msg, target: HTMLElement = this) {
    const ev = new CustomEvent("mvu:message", {
      bubbles: true,
      composed: true,
      detail: msg
    });
    target.dispatchEvent(ev);
  }

  getFromModel<T>(key: keyof M) {
    return this._model ? (this._model[key] as T) : undefined;
  }
}
