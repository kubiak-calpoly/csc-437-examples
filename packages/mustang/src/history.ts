import { LitElement } from "lit";
import { ContextProvider, createContext } from "@lit/context";

export let historyContext = createContext<Location>("auth");

export class History extends LitElement {
  _historyProvider;

  constructor() {
    super();
    this._historyProvider = new ContextProvider(this, {
      context: historyContext,
      initialValue: window.location
    });
  }

  createRenderRoot() {
    return this;
  }
}
