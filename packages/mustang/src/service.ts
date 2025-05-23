import { Context, Provider } from "./context";
import { Base, Dispatch } from "./message";
import { MapFn, Update } from "./update";

export class Service<Msg extends Base, T extends object> {
  _context: Context<T>;
  _update: Update<Msg, T>;
  _eventType: string;
  _running: boolean;
  _pending: Array<Msg> = [];

  attach(host: Provider<T>) {
    host.addEventListener(this._eventType, (ev: Event) => {
      ev.stopPropagation();
      const message = (ev as Dispatch<Msg>).detail;
      this.consume(message);
    });
  }

  start() {
    if (!this._running) {
      console.log(`Starting ${this._eventType} service`);
      this._running = true;
      this._pending.forEach((msg) => this.process(msg));
    }
  }

  constructor(
    update: Update<Msg, T>,
    context: Context<T>,
    eventType = "service:message",
    autostart = true
  ) {
    this._context = context;
    this._update = update;
    this._eventType = eventType;
    this._running = autostart;
  }

  apply(fn: MapFn<T>) {
    this._context.apply(fn);
  }

  consume(message: Msg) {
    if (this._running) {
      this.process(message);
    } else {
      console.log(
        `Queueing ${this._eventType} message`,
        message
      );
      this._pending.push(message);
    }
  }

  process(message: Msg) {
    console.log(
      `Processing ${this._eventType} message`,
      message
    );
    const command = this._update(
      message,
      this.apply.bind(this)
    );
    if (command) command(this._context.value);
  }
}
