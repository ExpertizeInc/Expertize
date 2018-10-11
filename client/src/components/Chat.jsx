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
      target: '',
      online: [],
      rooms: []
    }
    this.onChange = this.onChange.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  // componentWillReceiveProps(props) {
  //   const expert = props.location.state.session.expert.username
  //   const pupil = props.location.state.session.pupil.username
    
  //   this.setState({userOne: props.user.username, target:props.user.username === expert ? expert : pupil}, () => console.log('cwrp state', this.state))
  //   console.log('cwrp')
  // }

  componentDidMount() {
    // socket.emit('get username')
    const { match, user } = this.props
    const expert = match.location.state.session.expert.username
    const pupil = match.location.state.session.expert.username
    console.log('this is the props in chat', this.props)
    this.setState({userOne:user.username, target:user.username === expert ? pupil : expert}, () => console.log('the state of chat', this.state))
    // console.log('the props of chat looking for params',this.state)
    // setTimeout(() => this.setState({userOne: this.props.user.username, target: match.params.username}, ()=> console.log('the state in compnoenetdidimoutn', this.state)), 100)
    // console.log('chat component did mount! match is :', user, this.props)
    // socket.on('get user') {
    socket.emit('new user', user.username)
    socket.on('connect', () => {
      // var name = prompt('enter in username')
      console.log('userone at cdm in chat',user.username)
      // this.setState({userOne:user.username, target: this.props.match.params.username}, () => socket.emit('new user', this.state.userOne))
      // socket.emit('new user', name)
      // socket.emit('new user', this.state.userOne)
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
    // socket.on('receive message', (data) => {
    //   this.createRoom(e, data.user);
    // })
    // socket.on('outbound', (data) => {
    //   if (this.state.rooms.indexOf(data.from) === -1) {
    //     this.createRoom(null, data.from)
    //   }
    // })
  }

  componentDidMount() {
    const { him, me } = this.props
    this.setState({me:me, target:him}, () => console.log('the state in chatbox after set state',this.state))
    console.log('him:',him,'me',me)
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
    socket.emit('message', {target, text, nickname: this.state.userOne})
    this.setState({ text: ''})
  }

  render() { 
    return (
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
          <Button onClick={() => {this.sendMessage(target, text)}} >BUTTON to send text</Button>
        </Form>
        </Well>
      </div>
    );
  }
}
 
export default Chat;