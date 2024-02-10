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
var import_tours = __toESM(require("./services/tours"));
var import_profiles = __toESM(require("./services/profiles"));
var import_services = require("./services");
<<<<<<< HEAD
var import_basic_auth = require("./auth/basic-auth");
var import_api = __toESM(require("./api"));
=======
>>>>>>> main
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
(0, import_services.connect)("blazing");
<<<<<<< HEAD
app.use("/api", import_api.default);
=======
>>>>>>> main
app.get("/hello/:name", (req, res) => {
  const { name } = req.params;
  res.send(eta.render("./hello", { name }));
});
app.get("/tour/:id", (req, res) => {
  const { id } = req.params;
  import_tours.default.get(id).then((data) => res.send(eta.render("./tour", data)));
});
<<<<<<< HEAD
app.get(
  "/profile/new",
  import_basic_auth.basicAuth,
  (req, res) => {
    res.send(
      eta.render("./profile", {
        $new: true,
        $user: (0, import_basic_auth.authenticatedUser)(req)
      })
    );
  }
);
app.get(
  "/profile/show/:id",
  import_basic_auth.basicAuth,
  (req, res) => {
    const { id } = req.params;
    import_profiles.default.get(id).then((data) => {
      console.log("Data for /profile: ", JSON.stringify(data));
      res.send(eta.render("./profile", data));
    });
  }
);
app.get(
  "/profile/edit/:id",
  import_basic_auth.basicAuth,
  (req, res) => {
    const { id } = req.params;
    import_profiles.default.get(id).then((old) => {
      res.send(
        eta.render("./profile", { $edit: true, ...old })
      );
    });
  }
);
=======
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  const { edit } = req.query;
  import_profiles.default.get(id).then((pr) => {
    const data = { edit, ...pr };
    console.log("Data for /profile: ", JSON.stringify(data));
    res.send(eta.render("./profile", data));
  });
});
>>>>>>> main
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
