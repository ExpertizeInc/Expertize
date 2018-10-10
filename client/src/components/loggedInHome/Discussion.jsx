import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import Video from '../Video.jsx';
import Chat from '../Chat.jsx'

export default class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { match } = this.props
    return (
      <div className="centered">
      <Panel>
        Testing :)

        <Switch>
          <Route path={`${match.url}/video`} component={Video} />
          <Route path={`${match.url}/text`} render={()=> <Chat match={match} />} />
        </Switch>
        </Panel>
      </div>
    );
  }
}

