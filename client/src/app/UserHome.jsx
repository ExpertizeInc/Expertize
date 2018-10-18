import React, { Component } from 'react';
import QuestionForm from '../feed/QuestionForm.jsx';
import QuestionFeed from '../feed/QuestionFeed.jsx';
import Discussion from '../routes/Discussion.jsx';
import SessionChoice from '../sessions/SessionChoice.jsx';
import SessionAccepted from '../sessions/SessionAccepted.jsx';
import SessionRejected from '../sessions/SessionRejected.jsx';
import DailyNotification from '../profile/DailyNotification.jsx';
import QuestionFilter from '../feed/QuestionFilter.jsx';
import Profile from '../profile/Profile.jsx';
import Inbox from '../inbox/Inbox.jsx';
import Stats from '../feed/Stats.jsx';
import { Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_UNACCEPTED_SESSIONS, GET_EXPERT_SESSIONS } from '../apollo/gql.js';
import { Grid, Row, Col, Panel } from "react-bootstrap";
import Survey from '../sessions/Survey.jsx'
import { isNull } from 'util';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: [],
      dailyShow: false,
      status: ['online', 'offline'],
      order: 'createdAt_DESC',
      chat: ['text', 'audio', 'video'],
      tag: 'All',
      showPupil: true,
      showExpert: true
    }
    this.toggleDaily = this.toggleDaily.bind(this)
    this.handleStatusFilter = this.handleStatusFilter.bind(this)
    this.handleOrderFilter = this.handleOrderFilter.bind(this)
    this.handleTagFilter = this.handleTagFilter.bind(this)
    this.handleChatFilter = this.handleChatFilter.bind(this)
    this.handleTagFilter = this.handleTagFilter.bind(this)
    this.resetTag = this.resetTag.bind(this)
    this.toggleExpert = this.toggleExpert.bind(this)
    this.togglePupil = this.togglePupil.bind(this)
    this.togglePupilAndExpert = this.togglePupilAndExpert.bind(this)
  }

  togglePupil() {
    this.setState({showPupil: false}, () => console.log('toggled pupil:', this.state))
  }

  toggleExpert() {
    this.setState({showExpert: false}, () => console.log('toggled expert', this.state))
  }

  togglePupilAndExpert() {
    this.setState({showPupil: true, showExpert: true}, () => console.log('toggled both back on'))
  }

  toggleDaily() {
    this.setState({ dailyShow: false })
  }

  handleStatusFilter(e) {
    this.setState({ status: e })
  }

  handleOrderFilter(e) {
    this.setState({ order: e })
  }

  handleChatFilter(e) {
    this.setState({ chat: e })
  }

  handleTagFilter(e) {
    this.setState({ tag: e})
  }

  resetTag() {
    this.setState({ tag: 'All'})
  }


  render() {
    const { match, user } = this.props;
    const { dailyShow, status, order, chat, tag, showPupil, showExpert } = this.state;
    return (
      <React.Fragment>
        {user &&
          <div>
            {!user.dailyClaimed && <DailyNotification toggle={this.toggleDaily} show={dailyShow} user={user} />}
            {/* this will listen for all sessions where user has asked a question and then someone choose to start a session w/ them */}
            <Query query={GET_UNACCEPTED_SESSIONS} variables={{ username: user.username }} pollInterval={1000}>
              {({ loading, error, data }) => {
                if (loading) return <div></div>
                if (error) return <div>{console.log(error)}</div>
                if (data.sessionsWhereUnacceptedPupil.length > 0 && showPupil) {
                  return <SessionChoice togglePupil={this.togglePupil} session={data.sessionsWhereUnacceptedPupil[0]} user={user} match={match} />
                } else {
                  return null
                }
              }}
            </Query>
            <Query query={GET_EXPERT_SESSIONS} variables={{ username: user.username }} pollInterval={1000}>
              {({ loading, error, data }) => {
                if (loading) return <div></div>
                if (error) return <div>{console.log(error)}</div>
                if (true) console.log('get_expert_session', data)
                if (this.state.showExpert && data.sessionsForExpert && data.sessionsForExpert.length > 0) {
                  if (data.sessionsForExpert[0].accepted === true) {
                    return <SessionAccepted toggleExpert={this.toggleExpert} session={data.sessionsForExpert[0]} user={user} match={match} />
                  } else {
                    return <SessionRejected toggleExpert={this.toggleExpert} session={data.sessionsForExpert[0]} user={user} match={match} />
                  }
                } else {
                  return null
                }
              }}
            </Query>
            <Grid style={{ display: 'block', padding: "60px" }}>
              <Row style={{ padding: "14px" }}>
                <Col>
                  <Panel>
                    <div>SOMETHINGGGG</div>
                    <div>SOMETHINGGGG</div>
                    <div>SOMETHINGGGG</div>
                    <div>SOMETHINGGGG</div>
                    <div>SOMETHINGGGG</div>
                    <div>SOMETHINGGGG</div>
                  </Panel>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Panel>
                    <Stats match={ match } user={ user } />
                  </Panel>
                  <Panel>
                    <QuestionFilter
                      resetTag={this.resetTag}
                      handleStatus={this.handleStatusFilter}
                      handleOrder={this.handleOrderFilter}
                      handleChat={this.handleChatFilter}
                      handleTag={this.handleTagFilter}
                      status={status}
                      order={order}
                      chat={chat}
                      tag={tag} />
                  </Panel>
                </Col>
                <Col md={9}>
                  <Switch>
                    <Route path={`${match.url}/create`} render={(props) => <QuestionForm {...props} user={user} status={status} order={order} tag={tag} />} />
                    <Route path={`${match.url}/profile`} render={(props) => <Profile {...props} user={user} />} />
                    <Route path={`${match.url}/inbox`} render={(props) => <Inbox {...props} user={user} />} />
                    <Route path={`${match.url}/discussion`} render={({ match }) => <Discussion user={user} match={match} />} />
                    <QuestionFeed toggleBoth={this.togglePupilAndExpert} status={status} order={order} tag={tag} match={match} user={user} chat={chat} />
                  </Switch>
                </Col>
              </Row>
            </Grid>
          </div>
        }
      </React.Fragment>
    )
  }
}