import  io  from "socket.io-client";
import { BASE_URL } from "./constants";


export const CreateSocketConnection = () => {
  if(location.hostname === 'localhost')
  {
    return io(BASE_URL,{
      transports : ["websocket","polling"],
      withCredentials : true
    });
  }
  else{
    return io("https://tindev.duckdns.org",{
      path : '/api/socket-io',
      transports : ["websocket","polling"],
      withCredentials : true
    })
  }
};
