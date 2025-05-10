export interface Destination {
  name: string;
  link: string;
  startDate: Date;
  endDate: Date;
  featuredImage: string | undefined;
}

export interface Transportation {
  mode: TransportationType;
  routing: string[];
  startDate: Date;
  endDate?: Date;
  segments: Array<Segment>;
}

export type TransportationType = "air" | "rail" | "ship" | "bus";

export interface Segment {
  number: string;
  carrier: string;
  departure: Endpoint;
  arrival: Endpoint;
}

export interface Endpoint {
  name: string;
  code?: string;
  localtime: Date;
  tz: string;
}
