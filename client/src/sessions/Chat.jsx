import React, { Component } from 'react';
import { Panel, Button, Col, Grid } from 'react-bootstrap';
import ChatBox from './ChatBox.jsx'
import openSocket from 'socket.io-client';
import Timer from './Timer.jsx'
import MDSpinner from 'react-md-spinner'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Mutation } from 'react-apollo';
import { CREATE_MESSAGE } from '../apollo/gql.js';

const socket = openSocket('http://localhost:3001');

export default class Chat extends Component {
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
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    const { match, user } = this.props
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
    })
    socket.on('outbound', (message) => {
      if(this.state.target === message.from) {
        var temp = [{from:message.from, msg:message.msg}]
        this.setState(state => {
          return {messages: state.messages.concat(temp)}
        })
      }
    })
  }

  sendMessage(target, text, e) {
    e.preventDefault()
    var temp = [{from:this.state.userOne, msg:text}]
    this.setState(state => {
      return {messages: state.messages.concat(temp)}
    })
    socket.emit('message', {target, text, nickname: this.state.userOne})
    this.setState({ text: ''})
  }

  render() { 
    const { match, user } = this.props
    const { messages, userOne, target } = this.state
    const me = user.username === match.location.state.session.expert.username ? match.location.state.session.expert.username : match.location.state.session.pupil.username
    const opponent = user.username === match.location.state.session.expert.username ? match.location.state.session.pupil.username : match.location.state.session.expert.username
    return (
      this.state.online.length === 2 ? 
      <div>
        <Grid fluid={true}>
          <Panel>
            <Panel.Body>
              <h3>{match.location.state.session.question.title}</h3>
              <h5>{match.location.state.session.question.description}</h5>
              <h5>Expert: {match.location.state.session.expert.username} || Pupil: {match.location.state.session.pupil.username}</h5>
            </Panel.Body>
            {/* <Panel.Body>
              <ul>
              {this.state.online.map((user) => <li key={user}>{user}</li>)}
              </ul>
            </Panel.Body> */}
          </Panel>
          <Panel>
            <Timer history={this.props.match.history} user={user} session={match.location.state.session} minutes={match.location.state.session.question.duration}/>
          </Panel>
          <Panel>
            <ChatBox user={user} session={match.location.state.session} messages={messages} me={userOne} target={target} onChange={this.onChange} sendMessage={this.sendMessage} />
          </Panel>
          <Panel>
            <Col md={6} xs={6}>
            <CopyToClipboard text={messages.reduce((a,b) => a + (b.from + ': ' + b.msg + ' \n '), '')}
              onCopy={() => console.log('copied!', messages.reduce((a,b) => a + (b.from + ': ' + b.msg + ' - '), ''))}>
              <Button bsStyle='primary'>Copy to clipboard with button</Button>
            </CopyToClipboard>
            </Col >
            <Col md={6} xs={6}>
            <Mutation
                  mutation={ CREATE_MESSAGE }
                  variables={{ 
                    title: `Hi ${opponent}, ${me} would like to share their LinkedIn profile with you!`, 
                    message: `I would love to connect with you on LinkedIn! Here is my profile: ${user.linkedInProfile}`, 
                    recipient: { connect: { username: opponent } }, 
                    sender: { connect: { username: me } } 
                  }}
                >
                  {createMessage => {
                    return (
                      <Button className="primary" onClick={createMessage}>Send LinkedIn</Button>
                    );
                  }}
                </Mutation>
            </Col>
          </Panel>
        </Grid>
      </div> :
      <div>
        <MDSpinner size="50"/>
        <h4>Loading...</h4>
      </div>
  
    );
  }
}