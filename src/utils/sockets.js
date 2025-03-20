import { io } from "socket.io-client";

// ✅ Define separate paths for DEV and PROD
const DEV_BASE_URL = "http://localhost:7777"; // ✅ Backend at 7777 in dev mode
const PROD_BASE_URL = "https://tindev.duckdns.org";

const DEV_SOCKET_PATH = "/socket.io/";
const PROD_SOCKET_PATH = "/api/socket.io/";

// ✅ Create WebSocket connection
export const CreateSocketConnection = () => {
  const isLocalhost = location.hostname === "localhost";

  return io(isLocalhost ? DEV_BASE_URL : PROD_BASE_URL, {
    path: isLocalhost ? DEV_SOCKET_PATH : PROD_SOCKET_PATH,
    transports: ["polling", "websocket"], // ✅ Use both polling and websocket
    withCredentials: true,
  });
};
