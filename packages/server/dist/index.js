"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var import_promises = __toESM(require("node:fs/promises"));
var import_path = __toESM(require("path"));
var import_pages = require("./pages/index");
var import_auth = __toESM(require("./routes/auth"));
var import_tours = __toESM(require("./routes/tours"));
var import_travelers = __toESM(require("./routes/travelers"));
var import_filesystem = require("./services/filesystem");
var import_mongo = require("./services/mongo");
var import_tour_svc = __toESM(require("./services/tour-svc"));
var import_traveler_svc = __toESM(require("./services/traveler-svc"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
(0, import_mongo.connect)("blazing");
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(import_express.default.static(staticDir));
app.use(import_express.default.raw({ type: "image/*", limit: "32Mb" }));
app.use(import_express.default.json());
app.use("/auth", import_auth.default);
app.use("/api/travelers", import_auth.authenticateUser, import_travelers.default);
app.use("/api/tours", import_auth.authenticateUser, import_tours.default);
app.post("/images", import_filesystem.saveFile);
app.get("/images/:id", import_filesystem.getFile);
app.get("/ping", (_, res) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});
app.get("/login", (req, res) => {
  const page = new import_pages.LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/register", (req, res) => {
  const page = new import_pages.RegistrationPage();
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/traveler/:userid", (req, res) => {
  const { userid } = req.params;
  const mode = req.query["new"] !== void 0 ? "new" : req.query.edit !== void 0 ? "edit" : "view";
  if (mode === "new") {
    const page = new import_pages.TravelerPage(null, mode);
    res.set("Content-Type", "text/html").send(page.render());
  } else {
    import_traveler_svc.default.get(userid).then((data) => {
      if (!data) throw `Not found: ${userid}`;
      const page = new import_pages.TravelerPage(data, mode);
      res.set("Content-Type", "text/html").send(page.render());
    }).catch((error) => {
      console.log(error);
      res.status(404).end();
    });
  }
});
app.get("/login", (req, res) => {
  res.set("Content-Type", "text/html").send(renderPage(import_pages.LoginPage.render()));
});
app.use("/app", (_, res) => {
  const indexHtml = import_path.default.resolve(staticDir, "index.html");
  import_promises.default.readFile(indexHtml, { encoding: "utf8" }).then(
    (html) => res.send(html)
  );
});
app.get(
  "/destination/:tourId/:destIndex",
  (req, res) => {
    const { tourId, destIndex } = req.params;
    const di = parseInt(destIndex);
    const mode = req.query.edit ? "edit" : req.query.new ? "new" : "view";
    import_tour_svc.default.get(tourId).then((tour) => {
      const dest = tour.destinations[di].toObject();
      return __spreadProps(__spreadValues({}, dest), {
        tour: {
          name: tour.name
        },
        inbound: tour.transportation[di],
        outbound: tour.transportation[di + 1]
      });
    }).then((data) => {
      const page = new DestinationPage(data, mode);
      res.set("Content-Type", "text/html").send(page.render());
    });
  }
);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
