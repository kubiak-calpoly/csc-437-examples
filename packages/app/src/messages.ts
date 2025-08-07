import { Destination, Point, Tour, Traveler } from "server/models";

export interface Reactions = {
    onSuccess?: () => void;
    onFailure?: (err: Error) => void;          
}

export type Message =
  | [ "user/request", { userid: string }]
  | [ "profile/request", { userid: string }]
  | [ "profile/save",
      {
        userid: string;
        profile: Traveler;
      },
      Reactions
    ]
  | [ "route/request", { points: Point[] }]
  | [ "tour/index", { userid: string }]
  | [ "tour/request", { tourid: string }]
  | [ "tour/save-destination",
      {
        tourid: string;
        index: number;
        destination: Destination;
      },
      Reactions
    ];

