import React from "react";
import { Consumer } from "./UserProvider";

export const withUser = (WrappedComponent: any) => (props: any) => (
  <Consumer>{state => <WrappedComponent {...props} {...state} />}</Consumer>
);
