import React from "react";
import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { withUser } from "./context/withUser";

const App = (props: any) => {
  return (
    <div className="App">
      {!props.loggedIn && <Login />}
      {props.loggedIn && <Chat />}
    </div>
  );
};

export default withUser(App);
