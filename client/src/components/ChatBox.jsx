// import React from 'react';

// const ChatBox = ({messages}) => (
//   <div>
//     {messages.map((message, i) => <div key={i}>{console.log(message)}{message}</div>)}
//   </div>
// );

export default ChatBox;

import React, { Component } from 'react';
import { Form, FormControl, Button, Well } from 'react-bootstrap';
// import openSocket from 'socket.io-client';

// const socket = openSocket('http://localhost:3001');

// = ({messages, onChange, sendMessage, text}) => (
class ChatBox extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      text: '',
      messages: [],
      target: this.props.him,
      me: this.props.me

    }
    this.onChange = this.onChange.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    
  } 

  componentDidMount() {
    console.log('this is socket in chatbox', this.props.socket)
    this.props.socket.on('outbound', (message) => {
      console.log('WILL TIS WORK??', message, message.from)
      if(this.state.target === message.from) {
        var temp = [`${message.from}: ${message.msg}`]
        this.setState(state => {
          return {messages: state.messages.concat(temp)}
        })
      }
    })
  }
  

  onChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  sendMessage(target, text) {
    var temp = [`${this.state.me}: ${text}`]
    this.setState(state => {
      return {messages: state.messages.concat(temp)}
    })
    this.props.socket.emit('message', {target, text})
    this.setState({ text: ''})
  }

  render() {
    let {target, text} = this.state
    return (
      <div>
        <div><p>message box with {this.state.target}</p></div><br/>
        {this.state.messages.map(message => <div>{console.log(message)}{message}</div>)}
        <Form>
          <FormControl onChange={(e) => this.onChange(e)} value={this.state.text} placeholder="Chat" />
          <Button onClick={() => {this.sendMessage(target, text)}} >BUTTON to send text</Button>
          {/* <Button onClick={(e) => this.sendMessage(this.state.text)} >BUTTON to send text</Button>
          <Button value='sue' onClick={(e) => this.connectToUser(e)} >BUTTON to message sue</Button>
          <Button value='bob'onClick={(e) => this.connectToUser(e)} >BUTTON to message bob</Button> */}
        </Form>
      </div>
    )
  }
}
 
