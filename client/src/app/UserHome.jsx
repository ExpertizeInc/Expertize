import React, { Component } from 'react';
import QuestionForm from '../feed/QuestionForm.jsx';
import QuestionFeed from '../feed/QuestionFeed.jsx';
import Discussion from '../routes/Discussion.jsx';
import SessionChoice from '../sessions/SessionChoice.jsx';
import SessionAccepted from '../sessions/SessionAccepted.jsx';
import SessionRejected from '../sessions/SessionRejected.jsx';
import DailyNotification from '../profile/DailyNotification.jsx';
import { Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_UNACCEPTED_SESSIONS, GET_EXPERT_SESSIONS } from '../apollo/gql.js';
import { Grid, Row, Column } from "react-bootstrap";

import Survey from '../sessions/Survey.jsx'
// import OpenSocket from 'socket.io-client';
import { isNull } from 'util';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: [],
      dailyShow: false
    }
    this.toggleDaily = this.toggleDaily.bind(this)
  }

  toggleDaily() {
    this.setState({ dailyShow: false })
  }

  render() {
    const { match, user } = this.props
    const { dailyShow } = this.state
    return (
        <div>{user && 
        <div>
        {!user.dailyClaimed &&  <DailyNotification toggle={ this.toggleDaily } show={ dailyShow } user={ user } />}
        {/* this will listen for all sessions where user has asked a question and then someone choose to start a session w/ them */}
        <Query query={GET_UNACCEPTED_SESSIONS} variables={{ username: user.username }} pollInterval={500}>
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>{console.log(error)}</div>
            if (true) console.log('get_unaccepted-session fired', data.sessionsWhereUnacceptedPupil)
            if (data.sessionsWhereUnacceptedPupil.length > 0) {
              return <SessionChoice session={data.sessionsWhereUnacceptedPupil[0]} user={user} match={match}/>
            } else {
              return null
            }
          }}
        </Query>
        {/* this will listen for all sessions where user claimed a question and pupil accepted */}
        {/* <Query query={GET_ACCEPTED_SESSIONS} variables={{ username: user.username }} pollInterval={500}>
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>{console.log(error)}</div>
            if (true) console.log('get_accepted-session fired', data.sessionsWhereAcceptedExpert)
            if (data.sessionsWhereAcceptedExpert.length > 0) {
              return <SessionAccepted session={data.sessionsWhereAcceptedExpert[0]} user={user} match={match} />
            } else {
              return null
            }
          }}
        </Query>
        {/* this will listen for all sessions where user claimed question and pupil rejected */}
        {/* <Query query={GET_REJECTED_SESSIONS} variables={{ username: user.username }} pollInterval={500}>
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>{console.log(error)}</div>
            if (true) console.log('get_rejected-session fired', data.sessionsWhereRejectedExpert)
            if (data.sessionsWhereRejectedExpert.length > 0) {
              return <SessionRejected session={data.sessionsWhereRejectedExpert[0]} user={user} match={match}/>
            } else {
              return null
            }
          }}
        </Query>  */}
        <Query query={GET_EXPERT_SESSIONS} variables={{ username: user.username }} pollInterval={500}>
          {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return <div>{console.log(error)}</div>
            if (true) console.log('get_expert-session fired', data.sessionsForExpert)
            if (data.sessionsForExpert && data.sessionsForExpert.length > 0) {
              if (data.sessionsForExpert[0].accepted === true) {
                return <SessionAccepted session={data.sessionsForExpert[0]} user={user} match={match} /> 
              } else {
                return <SessionRejected session={data.sessionsForExpert[0]} user={user} match={match}/>
              }
            } else {
              return null
            }
          }}
        </Query>
        <Grid>
      <Switch>
      <Route path={`${match.url}/create`} render={(props) => <QuestionForm {...props} user={user} />} />
      <Route path={`${match.url}/discussion`} render={({match}) => <Discussion user={user} match={match} />} />
      <QuestionFeed match={match} user={user} />
      </Switch>
      </Grid>
      </div>}
</div>
    );
  }
}

