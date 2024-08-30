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
var auth_exports = {};
__export(auth_exports, {
  authenticateUser: () => authenticateUser,
  default: () => auth_default
});
module.exports = __toCommonJS(auth_exports);
var import_dotenv = __toESM(require("dotenv"));
var import_express = __toESM(require("express"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_credential_svc = __toESM(require("../services/credential-svc"));
const router = import_express.default.Router();
import_dotenv.default.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || "NOT_A_SECRET";
function generateAccessToken(username) {
  console.log("Generating token for", username);
  return new Promise((resolve, reject) => {
    import_jsonwebtoken.default.sign(
      { username },
      TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject(error);
        else {
          console.log("Token is", token);
          resolve(token);
        }
      }
    );
  });
}
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    import_credential_svc.default.create(username, password).then((creds) => generateAccessToken(creds.username)).then((token) => {
      res.status(201).send({ token });
    });
  }
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    import_credential_svc.default.verify(username, password).then((goodUser) => generateAccessToken(goodUser)).then((token) => res.status(200).send({ token })).catch((error) => res.status(401).send("Unauthorized"));
  }
});
function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).end();
  } else {
    import_jsonwebtoken.default.verify(token, TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        next();
      } else {
        res.status(401).end();
      }
    });
  }
}
var auth_default = router;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateUser
});
