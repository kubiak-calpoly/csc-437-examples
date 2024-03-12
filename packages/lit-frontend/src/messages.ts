import {
  AuthenticatedUser,
  APIUser,
  MsgType
} from "@calpoly/mustang";
import {
  Destination,
  Tour,
  Profile,
  Point,
  Route,
  ChatMessage
} from "ts-models";

export interface UserLoggedIn extends MsgType<"UserLoggedIn"> {
  user: AuthenticatedUser;
}

export interface TourSelected extends MsgType<"TourSelected"> {
  tourId: string;
}

export interface ProfileSelected
  extends MsgType<"ProfileSelected"> {
  userid: string;
}

export interface ProfileSaved extends MsgType<"ProfileSaved"> {
  userid: string;
  profile: Profile;
}

export interface DestinationSaved
  extends MsgType<"DestinationSaved"> {
  tourId: string;
  destId: number;
  destination: Destination;
}

export interface RouteRequested
  extends MsgType<"RouteRequested"> {
  points: Point[];
}

export type Message =
  | DestinationSaved
  | ProfileSelected
  | ProfileSaved
  | RouteRequested
  | TourSelected
  | UserLoggedIn;
