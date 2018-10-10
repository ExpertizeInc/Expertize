import React, { Component } from 'react';
import QuestionForm from './QuestionForm.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import Discussion from './Discussion.jsx';
import SessionChoice from './SessionChoice.jsx';
import SessionAccepted from './SessionAccepted.jsx';
import SessionRejected from './SessionRejected.jsx';
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
  }

  render() {
    const { match, user } = this.props
    return (  
      <div>
        {/* this will listen for all sessions where user has asked a question and then someone choose to start a session w/ them */}
        <Query query={GET_UNACCEPTED_SESSIONS} variables={{ username: user.username }} pollInterval={500}>
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>{console.log(error)}</div>
            if (data.sessionsWhereUnacceptedPupil.length > 0) {
              return <SessionChoice session={data.sessionsWhereUnacceptedPupil[0]} user={user} />
            } else {
              return null
            }
          }}
        </Query>
        {/* this will listen for all sessions where user claimed a question and pupil accepted */}
        <Query query={GET_ACCEPTED_SESSIONS} variables={{ username: user.username }} pollInterval={500}>
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>{console.log(error)}</div>
            if (data.sessionsWhereAcceptedExpert.length > 0) {
              return <SessionAccepted session={data.sessionsWhereAcceptedExpert[0]} user={user} match={match} />
            } else {
              return null
            }
          }}
        </Query>
        {/* this will listen for all sessions where user claimed question and pupil rejected */}
        <Query query={GET_REJECTED_SESSIONS} variables={{ username: user.username }} pollInterval={500}>
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>{console.log(error)}</div>
            if (data.sessionsWhereRejectedExpert.length > 0) {
              return <SessionRejected session={data.sessionsWhereRejectedExpert[0]} user={user} />
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

