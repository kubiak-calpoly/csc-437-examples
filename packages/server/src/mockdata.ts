import { DestinationPageData } from "pages";

export function getDestination(_: string) {
  return {
    tour: {
      name: "12 Days in Italy"
    },
    name: "Venice",
    startDate: new Date("2024-10-14"),
    endDate: new Date("2024-10-17"),
    location: { lat: 45.4375, lon: 12.335833 },
    featuredImage:
      "/images/full/Canal_Grande_Chiesa_della_Salute_e_Dogana_dal_ponte_dell_Accademia.jpg",
    accommodations: [
      {
        name: "Locanda San Barnaba",
        checkIn: new Date("2024-10-14"),
        checkOut: new Date("2024-10-17"),
        persons: 4,
        roomType: "2Q",
        rate: {
          amount: 190,
          currency: "EUR"
        }
      }
    ],
    excursions: [
      {
        name: "Vaporetto trip to Murano",
        type: "boat"
      },
      {
        name: "Walking tour of Piazza San Marco",
        type: "walking"
      }
    ],
    inbound: {
      type: "air",
      startDate: new Date("2024-10-13"),
      endDate: new Date("2024-10-14"),
      segments: [
        {
          provider: "United",
          name: "UA926",
          departure: {
            name: "San Francisco",
            station: "SFO",
            time: new Date("2024-10-13 19:05:00-0800")
          },
          arrival: {
            name: "Frankfurt",
            station: "FRA",
            time: new Date("2024-10-14 14:55:00+0100")
          }
        },
        {
          provider: "Lufthansa",
          name: "LH330",
          departure: {
            name: "Frankfurt",
            station: "FRA",
            time: new Date("2024-10-14 17:15:00+0100")
          },
          arrival: {
            name: "Venice",
            station: "VCE",
            time: new Date("2024-10-14 18:30:00+0100")
          }
        }
      ]
    },
    outbound: {
      type: "rail",
      startDate: new Date("2024-10-18"),
      segments: [
        {
          name: "9407 Frecciarossa",
          departure: {
            name: "Venice",
            station: "Venezia S. Lucia",
            time: new Date("2024-10-18 09:25:00+0100")
          },
          arrival: {
            name: "Florence",
            station: "Firenze S.M.N.",
            time: new Date("2024-10-18 11:30:00+0100")
          }
        }
      ]
    }
  } as DestinationPageData;
}