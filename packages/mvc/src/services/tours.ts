// CRUD services for Tours
import moment from "moment";
import { Tour } from "../models/Tour";
import { Profile } from "../models/Profile";

// in-memory DB
let profiles: Array<Profile> = [
  {
    id: "blaze",
    name: "Blaze Pasquale",
    nickname: undefined,
    home: "Oakland, CA",
    airports: ["SFO", "OAK", "SJC"],
    color: "#8A81BE",
    avatar: "/data/avatars/Blaze Pasquale.png"
  },
  {
    id: "mondy",
    name: "Pia Mondrian",
    nickname: "Mondy",
    home: "Ventura, CA",
    airports: ["LAX"],
    avatar: undefined,
    color: undefined
  },
  {
    id: "izzy",
    name: "Isabel Nuton",
    nickname: "Izzy",
    home: "San Miguel de Allende, Gto., Mexico",
    airports: ["BJX", "QRO"],
    avatar: undefined,
    color: undefined
  }
];

let tours: Array<Tour> = [
  {
    id: "tour0",
    name: "Trip to Italy",
    startDate: new Date("2024-10-13"),
    endDate: new Date("2024-10-25"),
    destinations: [
      {
        name: "Venice",
        link: "/places/venice",
        startDate: new Date("2024-10-14"),
        endDate: new Date("2024-10-18"),
        icon: "/icons/italy.svg#icon-venice",
        location: { lat: 45.4397, lon: 12.3319 },
        featuredImage:
          "/images/preview/Canal_Grande_Chiesa_della_Salute_e_Dogana_dal_ponte_dell_Accademia.jpg",
        accommodations: [
          {
            name: "Locanda San Barnaba",
            nights: 4,
            link: "/features/venice/locanda-san-barnaba"
          }
        ],
        excursions: [
          {
            name: "Murano",
            link: "/features/venice/murano",
            type: "boat"
          },
          {
            name: "Piazza San Marco",
            link: "/features/venice/piazza-san-marco",
            type: "walking"
          }
        ]
      },
      {
        name: "Florence",
        link: "/places/italy/florence",
        startDate: new Date("2024-10-18"),
        endDate: new Date("2024-10-21"),
        icon: "/icons/italy.svg#icon-florence",
        location: {
          lat: 43.7714,
          lon: 11.2542
        },
        featuredImage:
          "/images/preview/Firenze_-_Vista_dal_Piazzale_Michelangelo.jpg",
        accommodations: [
          {
            name: "Hotel Perseo",
            nights: 3,
            link: "/features/florence/hotel-perseo"
          }
        ],
        excursions: [
          {
            name: "Duomo and Campanile",
            link: "/features/florence/duomo-campanile",
            type: "walking"
          },
          {
            name: "Lucca",
            link: "/places/italy/lucca",
            type: "train"
          },
          {
            name: "Fiesole",
            link: "/places/italy/fiesole",
            type: "bus"
          }
        ]
      },
      {
        name: "Rome",
        link: "/places/italy/rome",
        startDate: new Date("2024-10-21"),
        endDate: new Date("2024-10-25"),
        icon: "/icons/italy.svg#icon-rome",
        location: {
          lat: 41.8931,
          lon: 12.4828
        },
        featuredImage:
          "/images/preview/Colosseum_in_Rome,_Italy_-_April_2007.jpg",
        accommodations: [
          {
            name: "La Piccola Maison",
            nights: 4,
            link: "/features/italy/rome/la-piccola-maison"
          }
        ],
        excursions: [
          {
            name: "Forum, Colosseum, Palatino Hill",
            link: "/features/italy/rome/forum-colosseum-palatino",
            type: "tour"
          },
          {
            name: "Vatican, St Peter's Cathedral",
            link: "/places/italy/vatican-city",
            type: "tour"
          }
        ]
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
              time: moment.parseZone("2024-10-18 09:25:00+0100")
            },
            arrival: {
              station: "Firenze S.M.N.",
              time: moment.parseZone("2024-10-18 11:30:00+0100")
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
              time: moment.parseZone("2024-10-21 15:38:00+0100")
            },
            arrival: {
              station: "Roma Termini",
              time: moment.parseZone("2024-10-21 17:10:00+0100")
            }
          }
        ]
      }
    ],
    entourage: [
      {
        profile: profiles[0],
        outbound: {
          type: "air",
          routing: ["SFO", "FRA", "VCE"],
          startDate: new Date("2024-10-13"),
          endDate: new Date("2024-10-14"),
          segments: [
            {
              name: "UA926",
              provider: "United",
              departure: {
                station: "San Francisco (SFO)",
                time: moment.parseZone(
                  "2024-10-13 19:05:00-0800"
                )
              },
              arrival: {
                station: "Frankfurt (FRA)",
                time: moment.parseZone(
                  "2024-10-14 14:55:00+0100"
                )
              }
            },
            {
              name: "LH330",
              provider: "Lufthansa",
              departure: {
                station: "Frankfurt (FRA)",
                time: moment.parseZone(
                  "2024-10-14 17:15:00+0100"
                )
              },
              arrival: {
                station: "Venice (VCE)",
                time: moment.parseZone(
                  "2024-10-14 18:30:00+0100"
                )
              }
            }
          ]
        },
        inbound: {
          type: "air",
          routing: ["FCO", "FRA", "SFO"],
          startDate: new Date("2024-10-25"),
          endDate: undefined,
          segments: [
            {
              name: "LH233",
              provider: "Lufthansa",
              departure: {
                station: "Rome (FCO)",
                time: moment.parseZone(
                  "2024-10-25 13:25:00+0100"
                )
              },
              arrival: {
                station: "Frankfurt (FRA)",
                time: moment.parseZone(
                  "2024-10-25 15:20:00+0100"
                )
              }
            },
            {
              name: "UA922",
              provider: "United",
              departure: {
                station: "Frankfurt (FRA)",
                time: moment.parseZone(
                  "2024-10-25 17:25:00+0100"
                )
              },
              arrival: {
                station: "San Francisco (SFO)",
                time: moment.parseZone(
                  "2024-10-25 19:45:00-0800"
                )
              }
            }
          ]
        }
      },
      {
        profile: profiles[1],
        inbound: undefined,
        outbound: undefined
      },
      {
        profile: profiles[1],
        inbound: undefined,
        outbound: undefined
      }
    ]
  }
];

export function get(id: String): Promise<Tour> {
  return new Promise((resolve, reject) => {
    const found = tours.find((t) => t.id === id);
    if (found) resolve(tours[0]);
    else reject(`Tour not found: ${id}`);
  });
}

export default { get };