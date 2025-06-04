import { Currency } from "./currency";
import { Point } from "./geo";

export interface Destination {
  name: string;
  startDate: Date;
  endDate: Date;
  location: Point;
  featuredImage?: string;
  accommodation: Accommodation;
  excursions: Array<Excursion>;
}

export interface Accommodation {
  name: string;
  checkIn: Date;
  checkOut: Date;
  roomType: RoomType;
  persons: 1 | 2 | 3 | 4;
  rate: Currency;
}

export type RoomType =
  | "S"
  | "D"
  | "Q"
  | "K"
  | "2T"
  | "2D"
  | "2Q"
  | "Dorm"
  | "Other";

export interface Excursion {
  name: string;
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
