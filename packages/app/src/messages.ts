import { Destination } from "server/models";

export type Msg =
  | ["tour/index", { userid: string }]
  | ["tour/select", { tourid: string }]
  | [
    "tour/save-destination",
    {
      tourid: string;
      index: number;
      destination: Destination;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ];
