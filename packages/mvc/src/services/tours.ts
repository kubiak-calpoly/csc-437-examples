// CRUD services for Tours
import { Tour } from "../models/Tour";

// in-memory
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
            type: undefined
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
            nights: 4,
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
    ]
  }
];

export function get(id: String): Promise<Tour> {
  return new Promise((resolve) => resolve(tours[0]));
}

export default { get };
