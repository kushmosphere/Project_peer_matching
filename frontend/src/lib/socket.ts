import type { Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  if (socket) return socket;
  try {
    // Lazy import to avoid build-time failure if dependency missing
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { io } = require("socket.io-client");
    const url = (import.meta.env.VITE_API_URL as string) || "http://localhost:8080";
    socket = io(url);
    return socket;
  } catch (err) {
    // socket.io-client not installed or running in an environment where require isn't available
    // Caller should handle null socket gracefully
    // eslint-disable-next-line no-console
    console.warn("socket.io-client not available; live chat disabled", err);
    return null;
  }
}

export default getSocket;
