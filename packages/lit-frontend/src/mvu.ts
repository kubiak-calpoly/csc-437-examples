import { TemplateResult } from "lit";

export type View<M> = (model: M) => TemplateResult;
export type Update<M, Msg> = (model: M, message: Msg) => M;

export interface App<M, Msg> {
  model: M;
  view: View<M>;
  updater: Update<M, Msg>;
}
