import React, { Component } from 'react';
import { Form, FormControl, Button, Well } from 'react-bootstrap';
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

  // sendMessage(target, text, e) {
  //   e.preventDefault();
  //   // var temp = [`${this.state.userOne}: ${text}`]
  //   var temp = [{from:this.state.userOne, msg:message.msg}]
  //   this.setState(state => {
  //     return {messages: state.messages.concat(temp)}
  //   },()=>console.log('state of chat when msg sent',target,text,this.state))
  //   socket.emit('message', {target, text, nickname: this.state.userOne})
  //   this.setState({ text: ''})
  // }
  render() {
    let { messages, me, sendMessage, target } = this.props
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
            {messages && messages.map((message, i) => (
              <div key={i} className={`chat ${check(message.from)}`}>
                <div className="user-photo"></div>
                <p className="chat-message">{message.msg}</p>	
              </div>
            ))}
          </div>
          <div className="chat-form">
            <textarea onChange={(e) => this.onChange(e)} value={this.state.text} placeholder='Message'></textarea>
            <button onClick={() => {sendMessage(target, this.state.text); this.setState({text:''})}}>Send</button>
          </div>
        </div>
      </div>
    )
  }
}