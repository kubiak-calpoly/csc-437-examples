const WS_HOST = window.location.host;
const WS_PATH = "/ws";

export interface Connection {
  channel: string;
  socket: WebSocket;
}

export type Receiver<T> = (msg: T) => void;

export function createConnection<T>(
  channel: string,
  receiver: Receiver<T>
) {
  const socket = new WebSocket(
    `ws://${WS_HOST}${WS_PATH}?channel=${channel}`
  );

  socket.onmessage = (event: MessageEvent) => {
    console.log("Received message:", event.data);
    const json = JSON.parse(event.data);
    receiver(json);
  };

  return { channel, socket };
}

export function sendMessage<T>(
  connection: Connection,
  json: T
) {
  connection.socket.send(JSON.stringify(json));
}
