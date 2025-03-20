import { io } from "socket.io-client";

const DEV_BASE_URL = "http://localhost:7777";
const PROD_BASE_URL = "https://tindev.duckdns.org";

const SOCKET_PATH = "/socket.io/";

export const CreateSocketConnection = () => {
  const isLocalhost = location.hostname === "localhost";

  return io(isLocalhost ? DEV_BASE_URL : PROD_BASE_URL, {
    path: SOCKET_PATH,
    transports: ["polling", "websocket"], 
    withCredentials: true,
  });
};
