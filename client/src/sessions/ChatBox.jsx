import React, { Component } from 'react';
import { Form, FormControl, Button, Well } from 'react-bootstrap';
import userImage from '../../dist/images/user.png';
import ChatLog from './ChatLog.jsx'
// import openSocket from 'socket.io-client';

// const socket = openSocket('http://localhost:3001');

// = ({messages, onChange, sendMessage, text}) => (
export default class ChatBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.onChange = this.onChange.bind(this)
    // this.sendMessage = this.sendMessage.bind(this)
  }

  onChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  render() {
    let { messages, me, sendMessage, target } = this.props
    const { user, session } = this.props
    
    return (
      <div id="chatbox-body">
        <div className="chatbox">
          {/* <div className="chatlogs">
            {messages && messages.map((message, i) => (
            <div key={i} className={`chat ${check(message.from)}`}>
              <img src={message.from === session.expert.username ? expertImage : pupilImage}></img>
              <p className="chat-message">{message.msg}</p>	
            </div>
            ))}
            <div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el }}></div>
          </div> */}
          <ChatLog messages={messages} me={me} target={target} session={session} />
          <div className="chat-form">
            <textarea onChange={(e) => this.onChange(e)} value={this.state.text} placeholder='Message'></textarea>
            <Button bsStyle='primary' onClick={() => {sendMessage(target, this.state.text); this.setState({text:''})}}>Send</Button>
          </div>
        </div>
      </div>
      )
  }
}