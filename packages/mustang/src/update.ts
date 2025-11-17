import * as Message from "./message";



export type Update<Msg extends Message.Base, M extends object> = (
  message: Msg,
  model: M
) => M | ThenUpdate<M, Msg>;

export type ThenUpdate<M, Msg extends Message.Base> =
 [now: M, ...later: Array<Promise<Msg | Message.None>>]
