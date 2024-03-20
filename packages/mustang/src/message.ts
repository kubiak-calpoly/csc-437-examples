export type Message<
  msg extends string,
  T extends object | undefined
> = [msg, T] | [msg];

type BaseMessage = Message<string, object | undefined>;

export class Dispatch<
  Msg extends BaseMessage
> extends CustomEvent<Msg> {
  constructor(msg: Msg, eventType: string = "mu:message") {
    super(eventType, {
      bubbles: true,
      composed: true,
      detail: msg
    });
  }
}
