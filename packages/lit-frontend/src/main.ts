import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
// MVU app
import {
  Auth,
  History,
  Router,
  Store,
  define
} from "@calpoly/mustang";
import { Model, init } from "./model";
import { Message } from "./messages";
import routes from "./routes";
import update from "./update";
import { BlazingHeaderElement } from "./components/blazing-header";

define({
  "mu-history": History,
  "mu-auth": Auth,
  "mu-store": class AppStore extends Store<Model, Message> {
    constructor() {
      super(update, init);
    }
  },
  "mu-router": class AppRouter extends Router {
    constructor() {
      super(routes);
    }
  },
  "blazing-header": BlazingHeaderElement
});
