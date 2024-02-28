"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var azure_exports = {};
__export(azure_exports, {
  downloadBlob: () => downloadBlob,
  uploadBlob: () => uploadBlob
});
module.exports = __toCommonJS(azure_exports);
var import_node_stream = require("node:stream");
var import_storage_blob = require("@azure/storage-blob");
var import_uuid = require("uuid");
const STORAGE_ACCOUNT = process.env.AZURE_STORAGE_ACCOUNT_NAME || "blazing";
const STORAGE_ACCESS_KEY = process.env.AZURE_STORAGE_ACCESS_KEY;
const STORAGE_CONTAINER = "uploads";
const blobServiceClient = import_storage_blob.BlobServiceClient.fromConnectionString(
  `DefaultEndpointsProtocol=https;AccountName=${STORAGE_ACCOUNT};AccountKey=${STORAGE_ACCESS_KEY};EndpointSuffix=core.windows.net`
);
const containerClient = blobServiceClient.getContainerClient(
  STORAGE_CONTAINER
);
function uploadBlob(req, res) {
  const filename = req.query.filename || "upload";
  const uuid = (0, import_uuid.v4)();
  const blobname = `${uuid}:${filename}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobname);
  const stream = import_node_stream.Readable.from(req.body);
  blockBlobClient.uploadStream(stream).then((blobResponse) => {
    res.status(201).send({
      url: `/images/${blobname}`,
      md5: blobResponse.contentMD5
    });
  }).catch((error) => {
    console.log("Blob upload error:", error);
    res.status(500).send({
      message: "failed to upload to blob storage",
      error
    });
  });
}
function downloadBlob(req, res) {
  const { blob } = req.params;
  const blockBlobClient = containerClient.getBlockBlobClient(blob);
  blockBlobClient.exists().then((exists) => {
    if (!exists) {
      res.status(404).send();
    } else {
      blockBlobClient.downloadToBuffer().then((buf) => {
        res.send(buf);
      });
    }
  }).catch((error) => {
    console.log("Blob download error:", error);
    res.status(500).send({
      message: "failed to download from blob storage",
      error
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  downloadBlob,
  uploadBlob
});
