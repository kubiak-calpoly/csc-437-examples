import { TypedMessage } from "./message";

export type ModelMap<M> = (model: M) => M;

export type UpdateResult<M> = M | Promise<ModelMap<M>>;

export type Update<M, Msg extends TypedMessage> = (
  model: M,
  message: Msg
) => UpdateResult<M>;

type DirectHandler<M, Msg> = (msg: Msg, model: M) => M;

type IndirectHandler<M, Msg> = (
  msg: Msg
) => Promise<ModelMap<M>>;

type Handler<M, Msg> =
  | DirectHandler<M, Msg>
  | IndirectHandler<M, Msg>;

export class Dispatch<M, Msg extends TypedMessage> {
  _handlers: Map<string, Handler<M, Msg>> = new Map();

  constructor() {
    this.update = this._update.bind(this);
  }

  addMessage(type: string, handler: Handler<M, Msg>) {
    this._handlers.set(type, handler);
  }

  update: Update<M, Msg>; // bound function

  _update(model: M, msg: Msg) {
    const { __type__ } = msg as TypedMessage;
    const handler = this._handlers.get(__type__);

    return handler ? handler(msg, model) : model;
  }
}

export type Assignments<M> = {
  [Property in keyof M]+?: unknown;
};

export function updateProps<M>(props: Assignments<M>) {
  return (m: M) => Object.assign({}, m, props) as M;
}

export function noUpdate<M>(m: M) {
  return m;
}
