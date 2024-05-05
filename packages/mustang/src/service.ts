import { Context, Provider } from "./context";
import { BaseMessage, Dispatch } from "./message";
import { MapFn, Update } from "./update";

export class Service<
  Msg extends BaseMessage,
  T extends object
> {
  _context: Context<T>;
  _update: Update<Msg, T>;
  _eventType: string;

  attach(host: Provider<T>) {
    host.addEventListener(this._eventType, (ev: Event) => {
      ev.stopPropagation();
      const message = (ev as Dispatch<Msg>).detail;
      this.consume(message);
    });
  }

  constructor(
    update: Update<Msg, T>,
    context: Context<T>,
    eventType = "service:message"
  ) {
    this._context = context;
    this._update = update;
    this._eventType = eventType;
  }

  apply(fn: MapFn<T>) {
    this._context.apply(fn);
  }

  consume(message: Msg) {
    const command = this._update(
      message,
      this.apply.bind(this),
      this._context.value
    );
    if (command) command(this._context.value);
  }
}
