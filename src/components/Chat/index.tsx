import React, { useState, useEffect } from "react";
import { withSocket } from "../../context/withSocket";
import { withUser } from "../../context/withUser";

const Chat = (props: any) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [typing, setTyping] = useState<any>(null);
  const [value, setValue] = useState("");
  const [color] = useState(
    "#" + (((1 << 24) * Math.random()) | 0).toString(16)
  );

  useEffect(() => {
    if (props.response) {
      const payload = props.response;

      if (payload && payload.message) {
        setMessages([
          ...messages,
          { userName: payload.userName, message: payload.message }
        ]);
      }

      if (payload && payload.userName && payload.typing) {
        console.log(payload, "<---");
        setTyping({
          ...typing,
          userName: payload.userName
        });
      }
    }
  }, [props.response]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    if (value) {
      props.send(
        JSON.stringify({
          action: "USER_TYPING",
          client: {
            clientId: props.user.clientId,
            userName: props.user.userName
          },
          typing: true
        })
      );
      return;
    }
  }, [value]);

  const handleInputChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <div
      style={{
        height: "800px",
        width: "800px",
        color: "black",
        fontWeight: "bolder",
        position: "relative",
        backgroundColor: "lightblue"
      }}
    >
      <div
        style={{
          height: "calc(100% - 42px)",
          overflow: "hidden",
          overflowY: "auto"
        }}
      >
        {messages.length > 0 &&
          messages.map((m: any, i: number) => {
            return (
              <div
                style={{ paddingLeft: 10, paddingTop: 2, fontSize: 20 }}
                key={i}
              >
                <span style={{ color }}>{m.userName}: </span>
                <span style={{ color: "black" }}>{m.message}</span>
              </div>
            );
          })}
      </div>
      {typing && typing.userName && (
        <div
          style={{ position: "absolute", bottom: 60, right: 40, fontSize: 18 }}
        >
          <span style={{ color }}>{typing.userName}</span> is typing...
        </div>
      )}
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          props.send(
            JSON.stringify({
              action: "REQUEST_RESPONSE",
              message: value,
              client: {
                clientId: props.user.clientId,
                userName: props.user.userName
              }
            })
          );
          setTyping(null);
          setValue("");
          props.send(
            JSON.stringify({
              action: "USER_TYPING",
              client: {
                clientId: props.user.clientId,
                userName: props.user.userName
              },
              typing: false
            })
          );
        }}
      >
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          autoFocus={true}
          style={{
            position: "absolute",
            borderWidth: 0,
            width: "100%",
            fontSize: 16,
            height: 40,
            bottom: 0,
            left: 0
          }}
        />
      </form>
    </div>
  );
};

export default withSocket(withUser(Chat));
