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
      online: [],
      rooms: []
    }
    this.createRoom = this.createRoom.bind(this)
  }

  componentWillReceiveProps(props) {
    // this.setState({userOne: props.user.username}, () => socket.emit('get username'))
    console.log(props)
  }

  componentDidMount() {
    // socket.emit('get username')
    console.log('chat component did mount!', this.props.match)
    // socket.on('get user') {

    }
    socket.on('connect', () => {
      // var name = prompt('enter in username')
      // console.log('userone at cdm in chat',name)
      // this.setState({userOne:name}, () => socket.emit('new user', this.state.userOne))
      // socket.emit('new user', name)
      socket.emit('new user', this.state.userOne)
      console.log('user connected to socket on componentdidmount')
    })
    socket.on('usernames', (data) => {
      this.setState({online:data})
      console.log('list of users',data)
    })
    socket.on('receive message', (data) => {
      this.createRoom(e, data.user);
    })
    socket.on('outbound', (data) => {
      if (this.state.rooms.indexOf(data.from) === -1) {
        this.createRoom(null, data.from)
      }
    })
    
  }

  createRoom(e, user) {
    user = this.state.userOne
    console.log('user of click',user)
    if(this.state.rooms.indexOf(user) === -1) {
      var temp = this.state.rooms.concat([user]).sort()
      console.log('temp', temp)
      this.setState({
        rooms: temp
      }, () => socket.emit('new room', user))
    } else {
      alert('already have room with that person')
    }
  }



  render() { 
    return (
      <div>
        <div>
          <h3>Online Users - I am {this.state.userOne}</h3>
          <ul>
            {this.state.online.map((user, i) => <li user={user} onClick={(e) => this.createRoom(e)}>{user}</li>)}
          </ul>
        </div>
        <Well>
          {this.state.rooms.map((room, i) => <div><ChatBox socket={socket} him={room} me={this.state.userOne}/></div> )}
        </Well>
      </div>
    );
  }
}
 
export default Chat;