import { Moment } from "moment";
import { Point } from "./geo";
import { Entourage } from "./entourage";

export interface Tour {
  name: string;
  destinations: Array<Destination>;
  transportation: Array<Transportation>;
  startDate: Date;
  endDate: Date;
  entourage: Entourage;
}

export interface Destination {
  name: string;
  link: string;
  startDate: Date;
  endDate: Date;
  location: Point;
  featuredImage: string | undefined;
  accommodations: Array<Accommodation>;
  excursions: Array<Excursion>;
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

export type ExcursionType =
  | "air"
  | "bike"
  | "boat"
  | "bus"
  | "food"
  | "metro"
  | "train"
  | "walking"
  | "tour"
  | undefined;

export interface Transportation {
  type: TransportationType;
  provider?: string;
  routing: string[];
  startDate: Date;
  endDate?: Date;
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
  time: Moment;
}
