import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom';
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
        <Link to={`${match.url}/text`}>ToText</Link>
        <Switch>
          <Route path={`${match.url}/video`} component={Video} />
          <Route path={`${match.url}/text`} render={(match)=> <Chat match={match} user={user} />} />
        </Switch>
        </Panel>
      </div>
    );
  }
}

