import { Destination, Traveler, Point } from "server/models";

export type Msg =
  | [ "user/select", { userid: string }]
  | [ "profile/select", { userid: string }]
  | [ "profile/save",
      {
        userid: string;
        profile: Traveler;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [ "route/request", { points: Point[] }]
  | [ "tour/index", { userid: string }]
  | [ "tour/select", { tourid: string }]
  | [ "tour/save-destination",
      {
        tourid: string;
        index: number;
        destination: Destination;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ];
