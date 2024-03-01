import WebSocket from "ws";
import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse
} from "http";
import { Request } from "express";

interface Connection {
  channel: string;
  client: WebSocket;
}

export default function websockets(expressServer: Server) {
  const wss = new WebSocket.Server({
    noServer: true,
    path: "/ws"
  });

  const connections: Connection[] = [];

  expressServer.on(
    "upgrade",
    (request: IncomingMessage, socket, head) => {
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

  wss.on("connection", (wsc: WebSocket) => {
    //connection is up, let's add a simple simple event
    wsc.on("message", (message: Buffer) => {
      const conn = connections.find((c) => c.client === wsc);
      const { channel } = conn || {};
      const clients = connections
        .filter((c) => c.channel === channel)
        .map((c) => c.client);

      //log the received message and send it to all clients on channel
      console.log("received, echoing: %s", message, channel);

      clients.forEach((wsc) => wsc.send(message.toString()));
    });
  });

  return wss;
}
