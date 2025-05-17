// websocket.ts

import { getShareableCode, getUsername } from "../sharing/sharing";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const WEBSOCKET_API = import.meta.env.VITE_WEBSOCKET_API;

let ws: WebSocket | null = null;

export const getWebSocket = (): WebSocket | null => ws;

export const connectToWebSocket = (): WebSocket => {
  if (ws && ws.readyState !== WebSocket.CLOSED && ws.readyState !== WebSocket.CLOSING) {
    return ws;
  }

  const url = new URL(`https://${BASE_URL}/${WEBSOCKET_API}`)

  url.searchParams.set("client_id", getShareableCode())
  url.searchParams.set("client_name", getUsername())

  ws = new WebSocket(url);

  ws.onopen = () => {
    console.log("WebSocket connected");
  };

  ws.onclose = (event) => {
    console.log("WebSocket closed", event.reason);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error", error);
  };

  return ws;
};

export const writeToWebSocket = (content: string) => {
    if (!ws || ws.readyState == WebSocket.CLOSED || ws.readyState == WebSocket.CLOSING) {
        return;
    }

    ws.send(content)
}

export const closeWebSocket = () => {
  if (ws) {
    ws.close();
    ws = null;
  }
};
