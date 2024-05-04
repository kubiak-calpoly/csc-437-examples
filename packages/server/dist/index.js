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
<<<<<<< HEAD:packages/express-backend/dist/index.js
var path = __toESM(require("path"));
var import_cors = __toESM(require("cors"));
var import_mongoConnect = require("./mongoConnect");
var import_auth = require("./auth");
var import_api = __toESM(require("./routes/api"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const frontend = require.resolve("lit-frontend");
const dist = path.resolve(frontend, "..", "..");
console.log("Serving lit-frontend from", dist);
(0, import_mongoConnect.connect)("blazing");
app.use(import_express.default.static(dist));
app.use(import_express.default.json({ limit: "500kb" }));
app.use((0, import_cors.default)());
app.options("*", (0, import_cors.default)());
app.post("/login", import_auth.loginUser);
app.post("/signup", import_auth.registerUser);
app.use("/api", import_api.default);
=======
var import_profiles = __toESM(require("./routes/profiles"));
var import_mongo = require("./services/mongo");
(0, import_mongo.connect)("blazing");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/api/profiles", import_profiles.default);
app.get("/hello", (_, res) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});
>>>>>>> mod-5:packages/server/dist/index.js
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
