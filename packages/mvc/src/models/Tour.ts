import { Point } from "./Geo.ts";

export interface Tour {
  id: string;
  name: string;
  destinations: Array<Destination>;
  startDate: Date;
  endDate: Date;
}

export interface Destination {
  name: string;
  link: string;
  startDate: Date;
  endDate: Date;
  icon: string | undefined;
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

type ExcursionType =
  | "bus"
  | "metro"
  | "train"
  | "walking"
  | "tour"
  | undefined;
