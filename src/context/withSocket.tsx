import React from "react";
import { Consumer } from "./SocketProvider";

export const withSocket = (WrappedComponent: any) => (props: any) => (
  <Consumer>{state => <WrappedComponent {...props} {...state} />}</Consumer>
);
