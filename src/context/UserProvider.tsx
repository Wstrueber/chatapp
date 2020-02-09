import React, { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { withSocket } from "./withSocket";

export const { Provider, Consumer } = createContext<any>({});

const UserProvider: React.FC = (props: any) => {
  const [user, setUser] = useState<any>({});
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    if (props.response) {
      if (
        props.response &&
        props.response.clientId &&
        !props.response.userName
      ) {
        console.log(user, "user");
        setUser({ ...user, clientId: props.response.clientId });
      }
    }
    // console.log(props.response);
  }, [props.response]);
  return (
    <Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      {props.children}
    </Provider>
  );
};

export default withSocket(UserProvider);
