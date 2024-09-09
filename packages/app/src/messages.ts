export type Msg =
  | ["tour/index", { userid: string }]
  | ["tour/select", { tourid: string }];
