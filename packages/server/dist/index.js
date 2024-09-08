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
var import_auth = __toESM(require("./routes/auth"));
var import_tours = __toESM(require("./routes/tours"));
var import_travelers = __toESM(require("./routes/travelers"));
var import_filesystem = require("./services/filesystem");
var import_mongo = require("./services/mongo");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
(0, import_mongo.connect)("blazing");
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(import_express.default.static(staticDir));
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
  res.set("Content-Type", "text/html").send((0, import_pages.renderPage)(import_pages.LoginPage.render()));
});
app.get("/register", (req, res) => {
  res.set("Content-Type", "text/html").send((0, import_pages.renderPage)(import_pages.RegistrationPage.render()));
});
app.get(
  "/destination/:tourId/:destIndex",
  (req, res) => {
    const { tourId, destIndex } = req.params;
    res.set("Content-Type", "text/html").send(
      (0, import_pages.renderPage)(
        import_pages.DestinationPage.render(tourId, parseInt(destIndex))
      )
    );
  }
);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
