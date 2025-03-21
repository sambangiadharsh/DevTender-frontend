import io from "socket.io-client";
import { BASE_URL } from "./constants";

// Create socket connection based on environment
export const CreateSocketConnection = () => {
  if (location.hostname === "localhost") {
    // Development (Localhost) WebSocket Connection
    return io(BASE_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });
  } else {
    // Production WebSocket Connection to Render Backend
    return io("https://devtinder-backend-8ruc.onrender.com", {
      path: "/socket.io/", // ✅ Correct WebSocket path for Render
      transports: ["websocket", "polling"],
      withCredentials: true,
    });
  }
};
