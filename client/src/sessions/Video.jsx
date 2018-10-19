import React, { Component } from 'react'
import Timer from './Timer.jsx'
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap'
import { Mutation } from 'react-apollo';
import { CREATE_MESSAGE } from '../apollo/gql.js';

export default class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomname: '',
      showframe: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({showframe: true})
  }

  handleChange(e) {
    this.setState({ roomname:e.target.value })
  }

  render() {
    const { user, match } = this.props
    const expert = match.location.state.session.expert.username
    const pupil = match.location.state.session.pupil.username
    const roomname = expert + pupil
    const me = user.username === expert ? expert : pupil
    const opponent = user.username === expert ? pupil : expert
    return (
      <React.Fragment>
        <Grid fluid={true}>
          <Panel>
            <Panel.Body>
              <h3>{match.location.state.session.question.title}</h3>
              <h5>{match.location.state.session.question.description}</h5>
              <h5>Expert: {expert} || Pupil: {pupil}</h5>
            </Panel.Body>
          </Panel>
          <Panel>
            <Timer history={match.history} user={user} session={match.location.state.session} minutes={match.location.state.session.question.duration}/>
          </Panel>
          <Panel>
            <iframe src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=91632a05-517e-4418-bcd2-ab58ff889970&iframe=true&room=${roomname}`} width='700' height='640' allow="microphone; camera"/>
          </Panel>
          <Panel> 
            <Col>
            <Mutation
              mutation={ CREATE_MESSAGE }
              variables={{ 
                title: `Hi ${opponent}, ${me} would like to share their LinkedIn profile with you!`, 
                message: `I would love to connect with you on LinkedIn! Here is my profile: ${user.linkedInProfile}`, 
                recipient: { connect: { username: opponent } }, 
                sender: { connect: { username: me } } 
              }}
            >
              {createMessage => {
                return (
                  <Button className="primary" onClick={createMessage}>Send LinkedIn</Button>
                );
              }}
            </Mutation>
          </Col>
        </Panel>
      </Grid>
      </React.Fragment>
    )
  }
};