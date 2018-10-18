import React, { Component } from 'react'
import Timer from './Timer.jsx'
import { Grid, Row, Col, Panel } from 'react-bootstrap'

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
  componentDidMount() {
    console.log('this.props in video component hopefully there is info',this.props)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({showframe: true})
  }

  handleChange(e) {
    this.setState({ roomname:e.target.value })
  }

  render() {
    console.log('props of video',this.props)
    const expert = this.props.match.location.state.session.expert.username
    const pupil = this.props.match.location.state.session.pupil.username
    const roomname = expert + pupil
    const { user, match } = this.props
    // console.log('duration of video', match.location.state.session.question.duration)
    console.log('session', this.props.match.location.state.session)
    console.log(roomname, 'expert', expert, 'pupil',pupil)
    return (
      <React.Fragment>
      <Grid fluid={true}>
      <Panel>
        <Panel.Body>
          <h3>{match.location.state.session.question.title}</h3>
          <h5>{match.location.state.session.question.description}</h5>
          <h5>Expert: {match.location.state.session.expert.username} || Pupil: {match.location.state.session.pupil.username}</h5>
        </Panel.Body>
      </Panel>
      <Panel>
        <Timer history={match.history} user={user} session={match.location.state.session} minutes={match.location.state.session.question.duration}/>
      </Panel>
      <Panel>
      <iframe src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=91632a05-517e-4418-bcd2-ab58ff889970&iframe=true&room=${roomname}`} width='700' height='640' allow="microphone; camera"/>
      </Panel>
      </Grid>
      </React.Fragment>
    )
  }
};