import { LitElement, TemplateResult } from "lit";

export type View<M> = (model: M) => TemplateResult;
export type Update<M, Msg> = (
  model: M,
  message: Msg
) => Promise<M>;
export type Element<M> = LitElement & { model: M };

export interface MsgType<t extends string> {
  type: t;
}

export interface App<M, Msg> {
  readonly model: M;
  updateFn: Update<M, Msg>;
}

export class MVUApp<M, Msg>
  extends LitElement
  implements App<M, Msg>
{
  model: M;

  updateFn: Update<M, Msg>;

  constructor(update: Update<M, Msg>, init: M) {
    super();
    this.model = init;
    this.updateFn = update;
    (this as HTMLElement).addEventListener(
      "mvu:message",
      (ev: Event) => {
        const msg = (ev as CustomEvent).detail as Msg;
        console.log("Got message: ", msg);
        this.receive(msg);
      }
    );
  }

  receive(msg: Msg) {
    if (this.model) {
      this.updateFn(this.model, msg).then((next) => {
        this.model = next;
        console.log("Model updated to", next);
      });
    }
  }
}
