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
var import_eta = require("eta");
var import_services = require("./services");
var import_services2 = require("./services");
var import_api = __toESM(require("./api"));
const app = (0, import_express.default)();
const eta = new import_eta.Eta({
  views: "./views"
});
const port = process.env.PORT || 3e3;
[
  "data",
  "icons",
  "js",
  "images",
  "maps",
  "pages",
  "styles"
].forEach(
  (dir) => app.use(`/${dir}`, import_express.default.static(`static/${dir}`))
);
(0, import_services2.connect)("blazing");
app.use("/api", import_api.default);
app.get("/hello/:name", (req, res) => {
  const { name } = req.params;
  res.send(eta.render("./hello", { name }));
});
app.get("/tour/:id", (req, res) => {
  const { id } = req.params;
  import_services.tour_service.get(id).then((data) => res.send(eta.render("./tour", data)));
});
app.get("/profile/new", (req, res) => {
  res.send(
    eta.render("./profile", {
      $new: true
    })
  );
});
app.get(
  "/profile/show/:id",
  (req, res, next) => {
    const { id } = req.params;
    import_services.profile_service.get(id).then((data) => {
      console.log(
        "Data for /profile: ",
        JSON.stringify(data)
      );
      res.send(eta.render("./profile", data));
    }).catch((error) => next(error));
  }
);
app.get("/profile/edit/:id", (req, res) => {
  const { id } = req.params;
  import_services.profile_service.get(id).then((old) => {
    res.send(eta.render("./profile", { $edit: true, ...old }));
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
