import React, { useEffect, useState, createContext } from "react";

export const { Provider, Consumer } = createContext<any>({});

const initWS = () => {
  return new WebSocket("ws://localhost:8080/ws");
};
const ws = initWS();
const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState(ws);
  const [response, setResponse] = useState({});

  const send = (args: any) => {
    socket.send(args);
  };

  useEffect(() => {
    socket.onopen = (e: any) => {
      console.log("Successfully Connected");
      send(
        JSON.stringify({
          action: "REQUEST_VERSION_NUMBER",
        })
      );
      socket.onclose = (e: any) => {
        console.log("Socket Closed Connection: ", e);
        setSocket(initWS());
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
