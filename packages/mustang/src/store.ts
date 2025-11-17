import * as Auth from "./auth";
import { Context, Provider } from "./context";
import * as Message from "./message";
import { Observer } from "./observer";
import { Service } from "./service";
import { Update, ThenUpdate } from "./update";

class StoreService<
  Msg extends Message.Base,
  M extends object
> extends Service<Msg, M> {
  static EVENT_TYPE = "mu:message";

  constructor(context: Context<M>, updateFn: Update<Msg, M>) {
    super(
      updateFn,
      context,
      StoreService.EVENT_TYPE,
      false // don't start
    );
  }
}

type AuthorizedUpdate<
  Msg extends Message.Base,
  M extends object
> = (
  message: Msg,
  model: M,
  user: Auth.User
) => M | ThenUpdate<M, Msg>

class StoreProvider<
  M extends object,
  Msg extends Message.Base
> extends Provider<M> {
  _updateFn: AuthorizedUpdate<Msg, M>;
  _authObserver: Observer<Auth.Model>;
  _user = new Auth.User();

  constructor(
    update: AuthorizedUpdate<Msg, M>,
    init: M,
    authContext: string
  ) {
    super(init);
    this._updateFn = update;
    this._authObserver = new Observer<Auth.Model>(
      this,
      authContext
    );
  }

  connectedCallback() {
    const service = new StoreService<Msg, M>(
      this.context,
      (msg: Msg, model: M) =>
        this._updateFn(msg, model, this._user)
    );
    service.attach(this);
    this._authObserver.observe(({ user }) => {
      console.log("Store got auth", user);
      if (user) this._user = user;
      service.start();
    });
  }
}

export { StoreProvider as Provider, StoreService as Service };
