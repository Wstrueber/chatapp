import React, { useEffect, useState, createContext } from "react";

const s = new WebSocket("wss:quiet-mesa-83538.herokuapp.com/ws");

export const { Provider, Consumer } = createContext<any>({});

const SocketProvider: React.FC = ({ children }) => {
  const [socket] = useState(s);
  const [response, setResponse] = useState({});

  const send = (args: any) => {
    socket.send(args);
  };

  useEffect(() => {
    socket.onopen = () => {
      console.log("Successfully Connected");
      send(
        JSON.stringify({
          action: "REQUEST_VERSION_NUMBER"
        })
      );
      socket.onclose = (e: any) => {
        console.log("Socket Closed Connection: ", e);
      };
      socket.onmessage = (response: any) => {
        setResponse(response);
      };
      socket.onerror = (e: any) => {
        console.log("Socket Error: ", e);
      };
    };
  }, []);

  return <Provider value={{ send, response }}>{children}</Provider>;
};

export default SocketProvider;
