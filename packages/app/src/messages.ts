import { Destination, Profile } from "server/models";

export type Msg =
  | ["profile/select", { userid: string }]
  | [
    "profile/save",
    {
      userid: string;
      profile: Profile;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ]
  | ["tour/index"]
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
