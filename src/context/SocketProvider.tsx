import React, { useEffect, useState, createContext } from "react";

let url = "ws:localhost:8080/ws";
if (process.env.NODE_ENV !== "development") {
  console.log(process.env.NODE_ENV);
  url = "wss:quiet-mesa-83538.herokuapp.com/ws";
}
console.log(process.env.NODE_ENV);
const s = new WebSocket(url);

export const { Provider, Consumer } = createContext<any>({});

const SocketProvider: React.FC = ({ children }) => {
  const [socket] = useState(s);
  const [response, setResponse] = useState({});

  const send = (args: any) => {
    socket.send(args);
  };

  useEffect(() => {
    socket.onopen = (e: any) => {
      console.log("Successfully Connected");

      send(
        JSON.stringify({
          action: "REQUEST_VERSION_NUMBER"
        })
      );
      socket.onclose = (e: any) => {
        console.log("Socket Closed Connection: ", e);
      };
      socket.onmessage = (e: any) => {
        setResponse(JSON.parse(e.data));
      };
      socket.onerror = (e: any) => {
        console.log("Socket Error: ", e);
      };
    };
  }, []);

  return <Provider value={{ send, response }}>{children}</Provider>;
};

export default SocketProvider;
