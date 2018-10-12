import React, { Component } from 'react';
import { Form, FormControl, Button, Well } from 'react-bootstrap';
import ChatBox from './ChatBox.jsx'
import openSocket from 'socket.io-client';
import Timer from './loggedInHome/Timer.jsx'

const socket = openSocket('http://localhost:3001');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
      socketId: '',
      userOne: '',
      target: '',
      online: [],
      rooms: [],
      view: false
    }
    this.onChange = this.onChange.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.handleTimerClick = this.handleTimerClick.bind(this)
  }

  componentDidMount() {
    // socket.emit('get username')
    const { match, user } = this.props
    const expert = match.location.state.session.expert.username
    const pupil = match.location.state.session.pupil.username
    // console.log('expert?',expert ,user.username === expert, 'pupil?',pupil,user.username===pupil, 'user is ', user.username)
    this.setState({userOne:user.username, target:user.username === expert ? pupil : expert}, () => console.log('the state of chat', this.state))
    socket.emit('new user', user.username)
    socket.on('connect', () => {
      // var name = prompt('enter in username')
      console.log('userone at cdm in chat',user.username)
      console.log('user connected to socket on componentdidmount')
    })
    socket.on('usernames', (data) => {
      this.setState({online:data})
      console.log('list of users',data)
    })
    socket.on('outbound', (message) => {
      console.log('WILL TIS WORK??', message, message.from)
      if(this.state.target === message.from) {
        var temp = [`${message.from}: ${message.msg}`]
        this.setState(state => {
          return {messages: state.messages.concat(temp)}
        })
      }
    })
  }

  handleTimerClick(e) {
    e.preventDefault()
    this.setState((prevState) => ({
      view:!prevState.view
    }))
  }

  onChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  sendMessage(target, text, e) {
    e.preventDefault();
    var temp = [`${this.state.userOne}: ${text}`]
    this.setState(state => {
      return {messages: state.messages.concat(temp)}
    },()=>console.log('state of chat when msg sent',target,text,this.state))
    socket.emit('message', {target, text, nickname: this.state.userOne})
    this.setState({ text: ''})
  }

  render() { 
    return (

      <div>
        <Timer handleTimerClick={this.handleTimerClick}/>
        {this.state.view ? 
        <div>
        <div>
          <h3>Online Users - I am {this.state.userOne}</h3>
          <ul>
            {this.state.online.map((user) => <li key={user}>{user}</li>)}
          </ul>
        </div>
        <Well>
        <div><p>message box with {this.state.target}</p></div><br/>
        {this.state.messages.map(message => <div>{console.log(message)}{message}</div>)}
        <Form>
          <FormControl onChange={(e) => this.onChange(e)} value={this.state.text} placeholder="Chat" />
          <Button onClick={(e) => {this.sendMessage(this.state.target, this.state.text, e)}} >BUTTON to send text</Button>
        </Form>
        </Well> </div> : <div></div>}
      </div>
    );
  }
}
 
export default Chat;