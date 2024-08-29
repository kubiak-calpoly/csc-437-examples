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
var import_express = __toESM(require("express"));
var import_pages = require("./pages");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(import_express.default.static(staticDir));
app.get("/hello", (_, res) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});
app.get(
  "/destination/:destId",
  (req, res) => {
    const { destId } = req.params;
    const destination = getDestination(destId);
    res.set("Content-Type", "text/html").send((0, import_pages.renderPage)(import_pages.DestinationPage.render(destination)));
  }
);
function getDestination(_) {
  return {
    tour: {
      name: "12 Days in Italy"
    },
    name: "Venice",
    startDate: /* @__PURE__ */ new Date("2024-10-14"),
    endDate: /* @__PURE__ */ new Date("2024-10-17"),
    location: { lat: 45.4375, lon: 12.335833 },
    featuredImage: "/images/full/Canal_Grande_Chiesa_della_Salute_e_Dogana_dal_ponte_dell_Accademia.jpg",
    accommodations: [
      {
        name: "Locanda San Barnaba",
        checkIn: /* @__PURE__ */ new Date("2024-10-14"),
        checkOut: /* @__PURE__ */ new Date("2024-10-17"),
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
      startDate: /* @__PURE__ */ new Date("2024-10-13"),
      endDate: /* @__PURE__ */ new Date("2024-10-14"),
      segments: [
        {
          provider: "United",
          name: "UA926",
          departure: {
            name: "San Francisco",
            station: "SFO",
            time: /* @__PURE__ */ new Date("2024-10-13 19:05:00-0800")
          },
          arrival: {
            name: "Frankfurt",
            station: "FRA",
            time: /* @__PURE__ */ new Date("2024-10-14 14:55:00+0100")
          }
        },
        {
          provider: "Lufthansa",
          name: "LH330",
          departure: {
            name: "Frankfurt",
            station: "FRA",
            time: /* @__PURE__ */ new Date("2024-10-14 17:15:00+0100")
          },
          arrival: {
            name: "Venice",
            station: "VCE",
            time: /* @__PURE__ */ new Date("2024-10-14 18:30:00+0100")
          }
        }
      ]
    },
    outbound: {
      type: "rail",
      startDate: /* @__PURE__ */ new Date("2024-10-18"),
      segments: [
        {
          name: "9407 Frecciarossa",
          departure: {
            name: "Venice",
            station: "Venezia S. Lucia",
            time: /* @__PURE__ */ new Date("2024-10-18 09:25:00+0100")
          },
          arrival: {
            name: "Florence",
            station: "Firenze S.M.N.",
            time: /* @__PURE__ */ new Date("2024-10-18 11:30:00+0100")
          }
        }
      ]
    }
  };
}
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
