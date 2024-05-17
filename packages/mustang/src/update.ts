import * as Message from "./message";

type Command<M> = (model: M) => void;
type MapFn<M> = (model: M) => M;
type ApplyMap<M> = (fn: MapFn<M>) => void;

type Update<Msg extends Message.Base, M extends object> = (
  message: Msg,
  apply: ApplyMap<M>
) => Command<M> | void;

function identity<M>(model: M): M {
  return model;
}

function replace<M>(replacements: Partial<M>): MapFn<M> {
  return (model: M) => ({ ...model, ...replacements });
}

export {
  identity,
  replace,
  type ApplyMap,
  type Command,
  type MapFn,
  type Update
};
