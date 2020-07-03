import React, { Component } from "react";
import "./Message.scss";

class Message extends Component<any, any> {
  constructor(props: any) {
    super(props);
    let temp = JSON.parse(this.props.message);
    this.state = {
      message: temp,
    };
  }

  render() {
    return <div className="Message">{this.state.message.body}</div>;
  }
}

export default Message;
