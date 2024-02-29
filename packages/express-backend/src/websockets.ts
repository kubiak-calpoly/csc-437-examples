import WebSocket from "ws";
import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse
} from "http";
import { Request } from "express";

export default (expressServer: Server) => {
  const wss = new WebSocket.Server({
    noServer: true,
    path: "/ws"
  });

  expressServer.on(
    "upgrade",
    (request: IncomingMessage, socket, head) => {
      wss.handleUpgrade(request, socket, head, (websocket) => {
        wss.emit("connection", websocket, request);
      });
    }
  );

  wss.on("connection", (wsc: WebSocket) => {
    //connection is up, let's add a simple simple event
    wsc.on("message", (message: string) => {
      //log the received message and send it back to the client
      console.log("received: %s", message);
      wsc.send(`Hello, you sent -> ${message}`);
    });

    //send immediately a feedback to the incoming connection
    wsc.send("Hi there, I am a WebSocket server");
  });

  return wss;
};
