import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import Video from '../Video.jsx';
import Chat from '../Chat.jsx'
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
        <Switch>
          <Route path={`${match.url}/video`} component={Video} />
          <Route path={`${match.url}/text/:username`} render={(match)=> <Chat match={match} user={user} />} />
        </Switch>
        </Panel>
      </div>
    );
  }
}

