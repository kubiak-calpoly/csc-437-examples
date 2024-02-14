import { LitElement, TemplateResult } from "lit";

export type View<M> = (model: M) => TemplateResult;
export type Update<M, Msg> = (
  model: M,
  message: Msg
) => Promise<M>;
export type Element<M> = LitElement & { model: M };
export interface Msg<t> {
  type: t;
}

export interface App<M, Msg> {
  readonly model: M;
  view: View<M>;
  update: Update<M, Msg>;
}
