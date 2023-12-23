import moment from "moment";
import { connect } from "./services";
import tour_service from "./services/tour_service";
import {
  Destination,
  Tour,
  Transportation
} from "../models/Tour";

let test_tours: Array<Tour> = [
  {
    id: "tour0",
    name: "Trip to Italy",
    startDate: new Date("2024-10-13"),
    endDate: new Date("2024-10-25"),
    destinations: [
      {
        name: "Venice",
        nights: 4,
        location: { lat: 45.4397, lon: 12.3319 },
        featuredImage:
          "/images/preview/Canal_Grande_Chiesa_della_Salute_e_Dogana_dal_ponte_dell_Accademia.jpg"
      },
      {
        name: "Florence",
        nights: 3,
        location: {
          lat: 43.7714,
          lon: 11.2542
        },
        featuredImage:
          "/images/preview/Firenze_-_Vista_dal_Piazzale_Michelangelo.jpg"
      },
      {
        name: "Rome",
        nights: 4,
        location: {
          lat: 41.8931,
          lon: 12.4828
        },
        featuredImage:
          "/images/preview/Colosseum_in_Rome,_Italy_-_April_2007.jpg"
      }
    ],
    transportation: [
      {
        type: "rail",
        routing: ["Venice", "Florence"],
        startDate: new Date("2024-10-18"),
        endDate: undefined,
        segments: [
          {
            name: "9407 Frecciarossa",
            provider: undefined,
            departure: {
              station: "Venezia S. Lucia",
              time: new Date("2024-10-18 09:25:00+0100"),
              tzOffset: 60
            },
            arrival: {
              station: "Firenze S.M.N.",
              time: new Date("2024-10-18 11:30:00+0100"),
              tzOffset: 60
            }
          }
        ]
      },
      {
        type: "rail",
        routing: ["Florence", "Rome"],
        startDate: new Date("2024-10-21"),
        endDate: undefined,
        segments: [
          {
            name: "9435 Frecciarossa",
            provider: undefined,
            departure: {
              station: "Firenze S.M.N.",
              time: new Date("2024-10-21 15:38:00+0100"),
              tzOffset: 60
            },
            arrival: {
              station: "Roma Termini",
              time: new Date("2024-10-21 17:10:00+0100"),
              tzOffset: 60
            }
          }
        ]
      }
    ],
    entourage: []
  }
];

connect("blazing");

Promise.all(test_tours.map(tour_service.create))
  .then((docs) =>
    docs.forEach((doc) =>
      console.log("Tour created:", JSON.stringify(doc))
    )
  )
  .catch((err) => console.log("Errors loading test tours"));
