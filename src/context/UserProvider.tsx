import React, { createContext } from "react";
import { useState } from "react";

export const { Provider, Consumer } = createContext<any>({});

const UserProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return <Provider value={{ loggedIn, setLoggedIn }}>{children}</Provider>;
};

export default UserProvider;
