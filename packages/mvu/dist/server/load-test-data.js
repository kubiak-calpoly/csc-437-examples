"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_services = require("./services");
var import_tour_service = __toESM(require("./services/tour_service"));
let test_tours = [
  {
    id: "tour0",
    name: "Trip to Italy",
    startDate: /* @__PURE__ */ new Date("2024-10-14"),
    endDate: /* @__PURE__ */ new Date("2024-10-25"),
    destinations: [
      {
        name: "Venice",
        nights: 4,
        location: { lat: 45.4397, lon: 12.3319 },
        featuredImage: "/images/preview/Canal_Grande_Chiesa_della_Salute_e_Dogana_dal_ponte_dell_Accademia.jpg"
      },
      {
        name: "Florence",
        nights: 3,
        location: {
          lat: 43.7714,
          lon: 11.2542
        },
        featuredImage: "/images/preview/Firenze_-_Vista_dal_Piazzale_Michelangelo.jpg"
      },
      {
        name: "Rome",
        nights: 4,
        location: {
          lat: 41.8931,
          lon: 12.4828
        },
        featuredImage: "/images/preview/Colosseum_in_Rome,_Italy_-_April_2007.jpg"
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
              time: /* @__PURE__ */ new Date("2024-10-18 09:25:00+0100"),
              tzOffset: 60
            },
            arrival: {
              station: "Firenze S.M.N.",
              time: /* @__PURE__ */ new Date("2024-10-18 11:30:00+0100"),
              tzOffset: 60
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
              time: /* @__PURE__ */ new Date("2024-10-21 15:38:00+0100"),
              tzOffset: 60
            },
            arrival: {
              station: "Roma Termini",
              time: /* @__PURE__ */ new Date("2024-10-21 17:10:00+0100"),
              tzOffset: 60
            }
          }
        ]
      }
    ],
    entourage: []
  }
];
(0, import_services.connect)("blazing");
Promise.all(test_tours.map(import_tour_service.default.create)).then(
  (docs) => docs.forEach(
    (doc) => console.log("Tour created:", JSON.stringify(doc))
  )
).catch((err) => console.log("Errors loading test tours"));
//# sourceMappingURL=load-test-data.js.map
