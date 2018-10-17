import React, { Component } from 'react';
import { Form, FormControl, Button, Well } from 'react-bootstrap';
import ChatBox from './ChatBox.jsx'
import openSocket from 'socket.io-client';
import Timer from './Timer.jsx'
import MDSpinner from 'react-md-spinner'
import ReactLoading from 'react-loading'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const socket = openSocket('http://localhost:3001');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: '',
      messages: [],
      socketId: '',
      userOne: '',
      target: '',
      online: [],
      rooms: [],
      view: false
    }
    // this.onChange = this.onChange.bind(this)
    // this.sendMessage = this.sendMessage.bind(this)
    this.handleTimerClick = this.handleTimerClick.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    // socket.emit('get username')
    const { match, user } = this.props
    console.log('session data',match.location.state.session)
    const expert = match.location.state.session.expert.username
    const pupil = match.location.state.session.pupil.username
    this.setState({userOne:user.username, target:user.username === expert ? pupil : expert}, () => console.log('the state of chat', this.state))
    socket.emit('new user', user.username)
    socket.on('connect', () => {
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
        // var temp = [`${message.from}: ${message.msg}`]
        var temp = [{from:message.from, msg:message.msg}]
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

  // onChange(e) {
  //   this.setState({
  //     text: e.target.value
  //   })
  // }

  sendMessage(target, text) {
    // e.preventDefault();
    // var temp = [`${this.state.userOne}: ${text}`]
    var temp = [{from:this.state.userOne, msg:text}]
    this.setState(state => {
      return {messages: state.messages.concat(temp)}
    },()=>console.log('state of chat when msg sent',target,text,this.state))
    socket.emit('message', {target, text, nickname: this.state.userOne})
    this.setState({ text: ''})
  }

  render() { 
    const { match, user } = this.props
    const { messages } = this.state
    const text = []
    messages.forEach(x => text.concat(x))
    return (
      this.state.online.length === 2 ? 
      <div>
        {<Timer user={user} session={match.location.state.session} minutes={match.location.state.session.question.duration}/>}
        <div>
          <div>
            <h3>Online Users - I am {this.state.userOne}</h3>
            <ul>
              {this.state.online.map((user) => <li key={user}>{user}</li>)}
            </ul>
          </div>
          <ChatBox messages={this.state.messages} me={this.state.userOne} target={this.state.target} onChange={this.onChange} sendMessage={this.sendMessage} />
          <CopyToClipboard text={text.join()}
          onCopy={() => console.log('copied!', this.state.messages.reduce((a,b) => a + b[0], ''))}>
          <button>Copy to clipboard with button</button>
        </CopyToClipboard>
        </div>
      </div> :
      <div>
        <MDSpinner size="50"/>
      </div>
  
    );
  }
}
 
export default Chat;