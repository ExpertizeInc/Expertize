// import React from 'react';

// const ChatBox = ({messages}) => (
//   <div>
//     {messages.map((message, i) => <div key={i}>{console.log(message)}{message}</div>)}
//   </div>
// );



import React, { Component } from 'react';
import { Form, FormControl, Button, Well } from 'react-bootstrap';
// import openSocket from 'socket.io-client';

// const socket = openSocket('http://localhost:3001');

// = ({messages, onChange, sendMessage, text}) => (
class ChatBox extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { messages, me, target, sendMessage } = this.props
    let check = (str) => str === me ? 'userOne' : 'target'
    return (
      <div id="chatbox-body">
        <div className="chatbox">
          <div className="chatlogs">
            {/* <div className="chat target">
              <div className="user-photo"></div>
              <p className="chat-message">What's up, Brother ..!!</p>	
            </div>
            <div className="chat userOne">
              <div className="user-photo"></div>
              <p className="chat-message">What's up, Brother ..!!</p>	
            </div> */}
            {messages && messages.map(message => (
              <div className={`chat ${check(message.from)}`}>
                <div className="user-photo"></div>
                <p className="chat-message">{message.msg}</p>	
              </div>
            ))}
          </div>
          <div className="chat-form">
            <textarea></textarea>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    )
  }
}
 
export default ChatBox;