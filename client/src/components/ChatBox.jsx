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
    this.state = {
      text: '',
      messages: [],
      target: '',//set username of other person
      me: ''//my username

    }
    this.onChange = this.onChange.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    
  } 

  componentDidMount() {
    const { him, me } = this.props
    this.setState({me:me, target:him}, () => console.log('the state in chatbox after set state',this.state))
    console.log('him:',him,'me',me)
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
    },()=>console.log(target,text,this.state.userOne))
    this.props.socket.emit('message', {target, text, nickname: this.state.userOnec})
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
        </Form>
      </div>
    )
  }
}
 
export default ChatBox;