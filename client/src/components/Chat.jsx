import React, { Component } from 'react';
import { Form, FormControl, Button, Well } from 'react-bootstrap';
import ChatBox from './ChatBox.jsx'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
      socketId: '',
      userOne: '',
      userTwo: ''
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.connecToUser = this.connectToUser.bind(this);
  }

  componentDidMount() {
    socket.on('connect', () => {
      console.log('user connected to socket on componentdidmount')
    })
    socket.on('outbound', (message) => {
      // console.log('WILL TIS WORK??', message)
      this.setState(state => {messages: state.messages.concat(message) });
    })
    let userOne = prompt(`What's your name?`);
    this.setState({ userOne })
  }

  sendMessage(text) {
    socket.emit('message', text);
    this.setState({ text });
  }

  connectToUser(e) {
    // this.setState({ userTwo: e.target.value}, () => {
    //   socket.emit('connectToUser', userOne, userTwo)
    // });
    // console.log(e.target.value)
  }

  render() { 
    const { messages, text } = this.state;
    return (
      <div>
        <Well>
          <ChatBox messages={messages} />
          <Form>
            <FormControl onChange={(e) => this.setState({ text: e.target.value }) } value={text} placeholder="Chat" />
            <Button onClick={() => this.sendMessage(text)} >Send Text</Button>
            <Button onClick={() => this.sendMessage(text)} >Send Text</Button>
            <Button value='sue' onClick={(e) => this.connectToUser(e)} >Message Sue</Button>
            <Button value='bob'onClick={(e) => this.connectToUser(e)} >Message Bob</Button>
          </Form>
        </Well>
      </div>
    );
  }
};