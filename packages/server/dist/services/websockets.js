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
var websockets_exports = {};
__export(websockets_exports, {
  default: () => websockets
});
module.exports = __toCommonJS(websockets_exports);
var import_ws = __toESM(require("ws"));
function websockets(expressServer) {
  const wss = new import_ws.default.Server({
    noServer: true,
    path: "/ws"
  });
  const connections = [];
  expressServer.on(
    "upgrade",
    (request, socket, head) => {
      const url = request.url || "";
      const matches = url.match(/.*\?channel=(\w+)/);
      const channel = matches ? matches[1] : "global";
      console.log("Got an upgrade request on channel", channel);
      wss.handleUpgrade(request, socket, head, (websocket) => {
        connections.push({ channel, client: websocket });
        wss.emit("connection", websocket, request);
      });
    }
  );
  wss.on("connection", (wsc) => {
    wsc.on("message", (message) => {
      const conn = connections.find((c) => c.client === wsc);
      const { channel } = conn || {};
      const clients = connections.filter((c) => c.channel === channel).map((c) => c.client);
      console.log("received, echoing: %s", message, channel);
      clients.forEach((wsc2) => wsc2.send(message.toString()));
    });
  });
  return wss;
}
