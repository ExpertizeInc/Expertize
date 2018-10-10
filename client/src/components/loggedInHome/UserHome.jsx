import React, { Component } from 'react';
import QuestionForm from './QuestionForm.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import Discussion from './Discussion.jsx';
import SessionChoice from './SessionChoice.jsx'
import { Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_UNACCEPTED_SESSIONS, GET_ACCEPTED_SESSIONS, GET_REJECTED_SESSIONS } from '../../gql.js';
import { isNull } from 'util';


export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: []
    }
    this.hideNotification = this.hideNotification.bind(this)
  }

  hideNotification() {
    this.setState({ session: []})
  }

  render() {
    const { match, user } = this.props

    return (  
      <div>
        {/* this will listen for all sessions where user has asked a question and then someone choose to start a session w/ them */}
      <Query query={GET_UNACCEPTED_SESSIONS} variables={{ username: user.username }} pollInterval={1000}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>
            if (data.sessionsWhereUnacceptedPupil.length > 0) {
              return <SessionChoice session={data.sessionsWhereUnacceptedPupil[0]} hideNotification={this.hideNotification} showNotification={this.showNotification} user={user} />
            } else {
              return null
            }
          }}
        </Query>

              <Query query={GET_REJECTED_SESSIONS} variables={{ username: user.username }} pollInterval={1000}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>
            if (data.sessionsWhereRejectedExpert.length > 0) {
              return <SessionChoice session={data.sessionsWhereUnacceptedPupil[0]} hideNotification={this.hideNotification} showNotification={this.showNotification} user={user} />
            } else {
              return null
            }
          }}
        </Query>

              <Query query={GET_ACCEPTED_SESSIONS} variables={{ username: user.username }} pollInterval={1000}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>
            if (data.sessionsWhereUnacceptedPupil.length > 0) {
              return <SessionChoice session={data.sessionsWhereUnacceptedPupil[0]} hideNotification={this.hideNotification} showNotification={this.showNotification} user={user} />
            } else {
              return null
            }
          }}
        </Query>

      <Switch>
      <Route path={`${match.url}/create`} render={(props) => <QuestionForm {...props} user={user} />} />
      <Route path={`${match.url}/discussion`} render={({match}) => <Discussion user={user} match={match} />} />
      <QuestionFeed match={match} user={user} />
      </Switch>

      </div>
    );
  }
}

