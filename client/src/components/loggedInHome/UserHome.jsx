import React, { Component } from 'react';
import QuestionForm from './QuestionForm.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import Discussion from './Discussion.jsx';
import AcceptSession from './AcceptSession.jsx'
import { Route, Switch } from 'react-router-dom';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: false
    }
    this.showNotification = this.showNotification.bind(this)
    this.hideNotification = this.hideNotification.bind(this)
  }

  showNotification() {
    this.setState({ notification: true })
  }

  hideNotification() {
    this.setState({ notification: false })
  }

  render() {
    const { match, user } = this.props
    return (  
      <div>
      <AcceptSession hideNotification={this.hideNotification} showNotification={this.showNotification} show={this.state.notification} user={user} />
      <Switch>
      <Route path={`${match.url}/create`} render={(props) => <QuestionForm {...props} user={user} />} />
      <Route path={`${match.url}/discussion`} render={({match}) => <Discussion user={user} match={match} />} />
      <QuestionFeed match={match} user={user} />
      </Switch>
    </div>
    );
  }
}

