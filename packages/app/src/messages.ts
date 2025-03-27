import { Destination, Traveler } from "server/models";

export type Msg =
  | ["profile/select", { userid: string }]
  | [
    "profile/save",
    {
      userid: string;
      profile: Traveler;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ]
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
