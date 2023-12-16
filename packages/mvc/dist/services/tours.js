"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var tours_exports = {};
__export(tours_exports, {
  default: () => tours_default,
  get: () => get
});
module.exports = __toCommonJS(tours_exports);
var import_moment = __toESM(require("moment"));
var import_profiles = __toESM(require("./profiles"));
let tours = [
  {
    id: "tour0",
    name: "Trip to Italy",
    startDate: /* @__PURE__ */ new Date("2024-10-13"),
    endDate: /* @__PURE__ */ new Date("2024-10-25"),
    destinations: [
      {
        name: "Venice",
        link: "/places/venice",
        startDate: /* @__PURE__ */ new Date("2024-10-14"),
        endDate: /* @__PURE__ */ new Date("2024-10-18"),
        icon: "/icons/italy.svg#icon-venice",
        location: { lat: 45.4397, lon: 12.3319 },
        featuredImage: "/images/preview/Canal_Grande_Chiesa_della_Salute_e_Dogana_dal_ponte_dell_Accademia.jpg",
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
        startDate: /* @__PURE__ */ new Date("2024-10-18"),
        endDate: /* @__PURE__ */ new Date("2024-10-21"),
        icon: "/icons/italy.svg#icon-florence",
        location: {
          lat: 43.7714,
          lon: 11.2542
        },
        featuredImage: "/images/preview/Firenze_-_Vista_dal_Piazzale_Michelangelo.jpg",
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
        startDate: /* @__PURE__ */ new Date("2024-10-21"),
        endDate: /* @__PURE__ */ new Date("2024-10-25"),
        icon: "/icons/italy.svg#icon-rome",
        location: {
          lat: 41.8931,
          lon: 12.4828
        },
        featuredImage: "/images/preview/Colosseum_in_Rome,_Italy_-_April_2007.jpg",
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
        startDate: /* @__PURE__ */ new Date("2024-10-18"),
        endDate: void 0,
        segments: [
          {
            name: "9407 Frecciarossa",
            provider: void 0,
            departure: {
              station: "Venezia S. Lucia",
              time: import_moment.default.parseZone("2024-10-18 09:25:00+0100")
            },
            arrival: {
              station: "Firenze S.M.N.",
              time: import_moment.default.parseZone("2024-10-18 11:30:00+0100")
            }
          }
        ]
      },
      {
        type: "rail",
        routing: ["Florence", "Rome"],
        startDate: /* @__PURE__ */ new Date("2024-10-21"),
        endDate: void 0,
        segments: [
          {
            name: "9435 Frecciarossa",
            provider: void 0,
            departure: {
              station: "Firenze S.M.N.",
              time: import_moment.default.parseZone("2024-10-21 15:38:00+0100")
            },
            arrival: {
              station: "Roma Termini",
              time: import_moment.default.parseZone("2024-10-21 17:10:00+0100")
            }
          }
        ]
      }
    ],
    entourage: [
      {
        profile: import_profiles.default.get("blaze"),
        outbound: {
          type: "air",
          routing: ["SFO", "FRA", "VCE"],
          startDate: /* @__PURE__ */ new Date("2024-10-13"),
          endDate: /* @__PURE__ */ new Date("2024-10-14"),
          segments: [
            {
              name: "UA926",
              provider: "United",
              departure: {
                station: "San Francisco (SFO)",
                time: import_moment.default.parseZone(
                  "2024-10-13 19:05:00-0800"
                )
              },
              arrival: {
                station: "Frankfurt (FRA)",
                time: import_moment.default.parseZone(
                  "2024-10-14 14:55:00+0100"
                )
              }
            },
            {
              name: "LH330",
              provider: "Lufthansa",
              departure: {
                station: "Frankfurt (FRA)",
                time: import_moment.default.parseZone(
                  "2024-10-14 17:15:00+0100"
                )
              },
              arrival: {
                station: "Venice (VCE)",
                time: import_moment.default.parseZone(
                  "2024-10-14 18:30:00+0100"
                )
              }
            }
          ]
        },
        inbound: {
          type: "air",
          routing: ["FCO", "FRA", "SFO"],
          startDate: /* @__PURE__ */ new Date("2024-10-25"),
          endDate: void 0,
          segments: [
            {
              name: "LH233",
              provider: "Lufthansa",
              departure: {
                station: "Rome (FCO)",
                time: import_moment.default.parseZone(
                  "2024-10-25 13:25:00+0100"
                )
              },
              arrival: {
                station: "Frankfurt (FRA)",
                time: import_moment.default.parseZone(
                  "2024-10-25 15:20:00+0100"
                )
              }
            },
            {
              name: "UA922",
              provider: "United",
              departure: {
                station: "Frankfurt (FRA)",
                time: import_moment.default.parseZone(
                  "2024-10-25 17:25:00+0100"
                )
              },
              arrival: {
                station: "San Francisco (SFO)",
                time: import_moment.default.parseZone(
                  "2024-10-25 19:45:00-0800"
                )
              }
            }
          ]
        }
      },
      {
        profile: import_profiles.default.get("mondy"),
        inbound: void 0,
        outbound: void 0
      },
      {
        profile: import_profiles.default.get("izzy"),
        inbound: void 0,
        outbound: void 0
      }
    ]
  }
];
function get(id) {
  return new Promise((resolve, reject) => {
    const found = tours.find((t) => t.id === id);
    if (found)
      resolve(tours[0]);
    else
      reject(`Tour not found: ${id}`);
  });
}
var tours_default = { get };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get
});
//# sourceMappingURL=tours.js.map
