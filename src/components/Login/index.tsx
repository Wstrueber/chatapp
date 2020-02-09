import React from "react";
import { useState } from "react";
import { withUser } from "../../context/withUser";
import { useEffect } from "react";
import { withSocket } from "../../context/withSocket";

const Login = (props: any) => {
  const [value, setValue] = useState("");

  const handleInputChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    props.send(
      JSON.stringify({
        action: "REQUEST_LOGIN",
        client: {
          clientId: props.user.clientId,
          userName: value
        }
      })
    );
    setValue("");
  };

  useEffect(() => {
    if (props.response) {
      if (props.response.userName) {
        props.setUser({ ...props.user, userName: props.response.userName });
        props.setLoggedIn(true);
      }
    }
  }, [props.response]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <h3>Choose a username</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          autoFocus={true}
          value={value}
          onChange={handleInputChange}
          style={{
            borderWidth: 0,
            fontSize: 20,
            height: 40,
            marginBottom: "calc(100% - 30px)"
          }}
        />
      </form>
    </div>
  );
};

export default withSocket(withUser(Login));
