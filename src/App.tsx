import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { withUser } from "./context/withUser";

const App = (props: any) => {
  console.log(props);
  return (
    <div className="App">
      {!props.loggedIn && <Login />}
      {props.loggedIn && <Chat />}
    </div>
  );
};

export default withUser(App);
