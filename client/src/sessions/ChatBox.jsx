import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
          <ChatLog messages={messages} me={me} target={target} session={session} />
          {/* <div className="chat-form"> */}
          <form className="chat-form">
            <input onChange={(e) => this.onChange(e)} value={this.state.text} placeholder='Message'></input>
            <Button bsStyle='primary' onClick={(e) => {sendMessage(target, this.state.text, e); this.setState({text:''})}}>Send</Button>
            </form>
          {/* </div> */}
        </div>
      </div>
      )
  }
}