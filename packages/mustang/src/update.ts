import { BaseMessage } from "./message";

export type Command<M> = (model: M) => void;
export type MapFn<M> = (model: M) => M;
export type ApplyMap<M> = (fn: MapFn<M>) => void;

export type Update<
  Msg extends BaseMessage,
  M extends object
> = (
  message: Msg,
  apply: ApplyMap<M>,
  model: M
) => Command<M> | void;

export function noUpdate<M>(model: M): M {
  return model;
}

export function replace<M>(replacements: Partial<M>): MapFn<M> {
  return (model: M) => ({ ...model, ...replacements });
}
