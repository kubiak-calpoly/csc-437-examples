import { Point } from "./Geo";
import { Profile } from "./Profile";

export interface Tour {
  id: string;
  name: string;
  destinations: Array<Destination>;
  transportation: Array<Transportation>;
  startDate: Date;
  endDate: Date;
  entourage: Array<Traveler>;
}

export interface Destination {
  name: string;
  location: Point;
  featuredImage: string | undefined;
  nights: number;
}

export interface Accommodation {
  name: string;
  link: string | undefined;
  nights: number;
}

export interface Excursion {
  name: string;
  link: string | undefined;
  type: ExcursionType;
}

type ExcursionType =
  | "boat"
  | "bus"
  | "metro"
  | "train"
  | "walking"
  | "tour"
  | undefined;

export interface Transportation {
  type: TransportationType;
  routing: Array<string>;
  startDate: Date;
  endDate: Date | undefined;
  segments: Array<Segment>;
}

type TransportationType = "air" | "rail" | "ship" | "bus";

export interface Segment {
  name: string;
  provider: string | undefined;
  departure: Endpoint;
  arrival: Endpoint;
}

export interface Endpoint {
  station: string;
  time: Date;
  tzOffset: number;
}

export interface Traveler {
  profile: Profile;
  outbound: Transportation | undefined;
  inbound: Transportation | undefined;
}