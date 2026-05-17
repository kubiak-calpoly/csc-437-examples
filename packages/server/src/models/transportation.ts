export interface Transportation {
  type: TransportationType;
  provider?: string;
  startDate: Date;
  endDate?: Date;
  segments: Array<Segment>;
}

export type TransportationType = "air" | "rail" | "ship" | "bus";

export interface Segment {
  name: string;
  provider: string | undefined;
  departure: Endpoint;
  arrival: Endpoint;
}

export interface Endpoint {
  name: string;
  station: string;
  time: Date;
  tzoffset: Number;
}
