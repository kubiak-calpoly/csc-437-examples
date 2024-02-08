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
  loginUser: () => loginUser,
  registerUser: () => registerUser
});
module.exports = __toCommonJS(auth_exports);
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    import_jsonwebtoken.default.sign(
      { username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}
const creds = [];
function registerUser(req, res) {
  const { username, pwd } = req.body;
  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else if (creds.find((c) => c.username === username)) {
    res.status(409).send("Username already taken");
  } else {
    import_bcrypt.default.genSalt(10).then((salt) => import_bcrypt.default.hash(pwd, salt)).then((hashedPassword) => {
      generateAccessToken(username).then((token) => {
        console.log("Token:", token);
        res.status(201).send({ token });
        creds.push({ username, hashedPassword });
      });
    });
  }
}
function loginUser(req, res) {
  const { username, pwd } = req.body;
  const retrievedUser = creds.find(
    (c) => c.username === username
  );
  if (!retrievedUser) {
    res.status(401).send("Unauthorized");
  } else {
    import_bcrypt.default.compare(pwd, retrievedUser.hashedPassword).then((matched) => {
      if (matched) {
        generateAccessToken(username).then((token) => {
          res.status(200).send({ token });
        });
      } else {
        res.status(401).send("Unauthorized");
      }
    }).catch(() => {
      res.status(401).send("Unauthorized");
    });
  }
}
function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("No token received", req.url);
    res.status(401).end();
  } else {
    import_jsonwebtoken.default.verify(
      token,
      process.env.TOKEN_SECRET,
      (error, decoded) => {
        if (decoded) {
          next();
        } else {
          console.log("JWT error:", error);
          res.status(401).end();
        }
      }
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateUser,
  loginUser,
  registerUser
});
