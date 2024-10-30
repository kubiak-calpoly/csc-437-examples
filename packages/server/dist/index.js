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
var import_pages = require("./pages/index");
var import_tours = __toESM(require("./routes/tours"));
var import_travelers = __toESM(require("./routes/travelers"));
var import_mongo = require("./services/mongo");
var import_tour_svc = __toESM(require("./services/tour-svc"));
var import_traveler_svc = __toESM(require("./services/traveler-svc"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
(0, import_mongo.connect)("blazing");
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/api/travelers", import_travelers.default);
app.use("/api/tours", import_tours.default);
app.get("/hello", (_, res) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});
app.get("/traveler/:userid", (req, res) => {
  const { userid } = req.params;
  import_traveler_svc.default.get(userid).then((data) => {
    const page = new import_pages.TravelerPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  });
});
app.get(
  "/destination/:tourId/:destIndex",
  (req, res) => {
    const { tourId, destIndex } = req.params;
    const di = parseInt(destIndex);
    import_tour_svc.default.get(tourId).then((tour) => {
      const dest = tour.destinations[di];
      return {
        ...dest,
        tour: {
          name: tour.name
        },
        inbound: tour.transportation[di],
        outbound: tour.transportation[di + 1]
      };
    }).then((data) => {
      const page = new import_pages.DestinationPage(data);
      res.set("Content-Type", "text/html").send(page.render());
    });
  }
);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
