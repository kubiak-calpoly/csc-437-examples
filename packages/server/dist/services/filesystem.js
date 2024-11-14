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
var filesystem_exports = {};
__export(filesystem_exports, {
  getFile: () => getFile,
  saveFile: () => saveFile
});
module.exports = __toCommonJS(filesystem_exports);
var import_promises = __toESM(require("node:fs/promises"));
var import_node_stream = require("node:stream");
var import_uuid = require("uuid");
const IMAGES = process.env.IMAGES || "/tmp";
function saveFile(req, res) {
  const filename = req.query.filename || "upload";
  const uuid = (0, import_uuid.v4)();
  const blobname = `${uuid}:${filename}`;
  const stream = import_node_stream.Readable.from(req.body);
  import_promises.default.open(`${IMAGES}/${blobname}`, "w").then((file) => import_promises.default.writeFile(file, stream)).then(() => {
    res.status(201).send({
      url: `/images/${blobname}`
    });
  }).catch((error) => {
    res.status(500).send({
      message: "failed to upload file to server filesysteem",
      error
    });
  });
}
function getFile(req, res) {
  const { id } = req.params;
  import_promises.default.readFile(`${IMAGES}/${id}`).then((buf) => {
    res.send(buf);
  }).catch((error) => {
    res.status(404).send({
      message: `Not Found: ${id}`,
      error
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFile,
  saveFile
});
