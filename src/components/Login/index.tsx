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
    props.send(JSON.stringify({ action: "REQUEST_LOGIN", message: value }));
    setValue("");
  };

  useEffect(() => {
    if (props.response && props.response.data) {
      const res = JSON.parse(props.response.data);
      console.log(res);
      if (res.response && res.response.userName) {
        props.setLoggedIn(true);
      }
    }
  }, [props.response]);
  return (
    <div>
      <h3>Choose a username</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          autoFocus={true}
          value={value}
          onChange={handleInputChange}
          style={{
            borderWidth: 0,
            width: "500px",
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
