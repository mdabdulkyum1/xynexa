
import { io } from "socket.io-client";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// Parse URL to get origin (protocol + host + port), stripping path like /api/v1
// This prevents Socket.IO from treating /api/v1 as a namespace
const socketUrl = new URL(SERVER_URL || "http://localhost:5000").origin;

export const socket = io(socketUrl, {
  autoConnect: false, 
  withCredentials: true,
});
