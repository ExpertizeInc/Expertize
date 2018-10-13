import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import Video from '../Video.jsx';
import Chat from '../Chat.jsx'
import ChatBox from '../ChatBox.jsx'
// import openSocket from 'socket.io-client'

// const socket = openSocket('http://localhost:3001');

export default class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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
          <Route path={`${match.url}/video`} component={Video} />
          <Route path={`${match.url}/text`} render={(match)=> <Chat match={match} user={user} />} />
          <Route path={`${match.url}/chatbox`} component={ChatBox} />
        </Switch>
        </div>
        </Panel>
      </div>
    );
  }
}

