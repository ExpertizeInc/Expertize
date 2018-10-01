import React, { Component } from 'react';
import { Form, FormControl, Button, Well } from 'react-bootstrap';
import ChatBox from './ChatBox.jsx'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
      socketId: '',
      userOne: '',
      userTwo: ''
    }
    this.onChange = this.onChange.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.connecToUser = this.connectToUser.bind(this)
  }

  componentDidMount() {
    socket.on('connect')
    socket.on('outbound', (message) => {
      console.log('WILL TIS WORK??', message)
      this.setState(state => {
        return {messages: state.messages.concat(message)}
      })
    })
    var username = prompt(`What's your name?`)
    this.setState({
      userOne: username
    })
  }

  onChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  sendMessage(msg) {
    socket.emit('message', msg)
    this.setState({ text: ''})
  }

  connectToUser(e) {
    // this.setState({ userTwo: e.target.value}, () => {
    //   socket.emit('connectToUser', userOne, userTwo)
    // })
    // console.log(e.target.value)
  }



  render() { 
    return (
      <div>
        <Well>
          <ChatBox messages={this.state.messages} />
          <Form>
            <FormControl onChange={(e) => this.onChange(e)} value={this.state.text} placeholder="Chat" />
            <Button onClick={() => this.sendMessage(this.state.text)} >BUTTON to send text</Button>
            <Button onClick={() => this.sendMessage(this.state.text)} >BUTTON to send text</Button>
            <Button value='sue' onClick={(e) => this.connectToUser(e)} >BUTTON to message sue</Button>
            <Button value='bob'onClick={(e) => this.connectToUser(e)} >BUTTON to message bob</Button>
          </Form>
        </Well>
      </div>
    );
  }
}
 
export default Chat;