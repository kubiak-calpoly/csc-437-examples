import { Schema, Model, Document, model } from "mongoose";
import {
  Tour,
  Destination,
  Endpoint,
  Segment,
  Transportation
} from "../../../models/Tour";
import { Point } from "../../../models/Geo";

const PointSchema = new Schema<Point>({
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  }
});

const DestinationSchema = new Schema<Destination>({
  name: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    trim: true
  },
  nights: {
    type: Number,
    required: true
  },
  location: {
    type: PointSchema
  }
});

const EndpointSchema = new Schema<Endpoint>({
  station: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  tzOffset: {
    type: Number
  }
});

const SegmentSchema = new Schema<Segment>({
  name: {
    type: String,
    required: true
  },
  provider: {
    type: String
  },
  departure: {
    type: EndpointSchema
  },
  arrival: {
    type: EndpointSchema
  }
});

const TransportationSchema = new Schema<Transportation>({
  type: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  segments: {
    type: [SegmentSchema]
  }
});

const TourSchema = new Schema<Tour>(
  {
    id: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    destinations: {
      type: [DestinationSchema],
      required: true
    },
    transportation: {
      type: [TransportationSchema],
      required: true
    }
  },
  { collection: "tour_data" }
);

const TourModel = model<Tour>("Tour", TourSchema);

export default TourModel;
