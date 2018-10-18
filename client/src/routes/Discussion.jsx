import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import Video from '../sessions/Video.jsx';
import Chat from '../sessions/Chat.jsx'
import ChatBox from '../sessions/ChatBox.jsx'
// import openSocket from 'socket.io-client'

// const socket = openSocket('http://localhost:3001');

export default class Discussion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match, user } = this.props
    return (
      <div className="centered">
      <Panel>
        Testing :
        asdfasdfdsa
        <Link to={`${match.url}/chatbox`}>ToText</Link>
        <div>
        <Switch>
          <Route path={`${match.url}/video`} render={(match) => <Video match={match} user={user} />} />
          <Route path={`${match.url}/text`} render={(match)=> <Chat match={match} user={user} />} />
          <Route path={`${match.url}/chatbox`} component={ChatBox} />
        </Switch>
        </div>
        </Panel>
      </div>
    );
  }
}

