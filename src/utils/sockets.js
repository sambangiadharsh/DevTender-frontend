import { io } from "socket.io-client";

// ✅ Define separate paths directly
const DEV_BASE_URL = "http://localhost:7777";
const PROD_BASE_URL = "https://tindev.duckdns.org/api";

const DEV_SOCKET_PATH = "/socket.io/";
const PROD_SOCKET_PATH = "/api/socket.io/";

// ✅ Create socket connection
export const CreateSocketConnection = () => {
  const isLocalhost = location.hostname === "localhost";

  return io(isLocalhost ? DEV_BASE_URL : PROD_BASE_URL, {
    path: isLocalhost ? DEV_SOCKET_PATH : PROD_SOCKET_PATH,
    transports: ["polling", "websocket"], // ✅ Use both polling and websocket
    withCredentials: true,
  });
};
