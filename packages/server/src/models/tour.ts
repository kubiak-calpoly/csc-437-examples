import { Point } from "./geo";

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
  | "boat"
  | "bus"
  | "metro"
  | "train"
  | "walking"
  | "tour"
  | undefined;
