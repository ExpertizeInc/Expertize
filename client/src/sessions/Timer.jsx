import React, { Component } from 'react'
import Survey from './Survey.jsx'
import { Link } from 'react-router-dom'
import { Button, Grid, Panel, Row, Col } from 'react-bootstrap'


export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 30,
      survey: false
    }
    this.intervalHandle
    this.handleClick = this.handleClick.bind(this)
    this.tick = this.tick.bind(this)
    this.startTimer = this.startTimer.bind(this)
  }

  componentDidMount() {
    this.setState({
      time: this.props.minutes * 60
    }, () => this.startTimer())  
  }

  tick() {
    var stateTime = this.state.time
    if (this.state.time <= 0) {
      clearInterval(this.intervalHandle)
      alert('times up bro')
    } else {
      this.setState((prevState) => ({
        time: prevState.time - 1
      }));
    }
  }
  
  startTimer(e) {
    // this.props.handleTimerClick(e)
    this.intervalHandle = setInterval(this.tick, 1000)
  }

  handleClick(){
    // e.preventDefault()
    this.setState({ survey: true, time: null }, () => clearInterval(this.intervalHandle))
  }

  render() {
    const { time, survey } = this.state
    const { user, session } = this.props
    const me = user.username === session.expert.username ? session.expert.username : session.pupil.username
    const opponent = user.username === session.expert.username ? session.pupil.username : session.expert.username
    console.log('the props in timer', this.props)
    const min = Math.floor(time / 60)
    const sec = time % 60 === 0 ? '00' : time % 60 > 9 ?  time % 60 : ('0' + (time % 60).toString())
    return (
      // this.state.survey ?
      <React.Fragment>
        {/* <Grid fluid='true'>
            <Row>
              <Col md={6} xs={6}>
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
              <Col md={6} xs={6}> */}
                {user.username === session.pupil.username ? 
                  time <= 0 || survey ?
                    <Survey session={session} /> :
                    <div>
                    <h3 style={{"font-family": 'Orbitron'}} >{min} : {sec} Remaining</h3>
                    <Button bsStyle='primary' onClick={this.handleClick}>Finish Session</Button>
                    </div>
                  :
                  time <= 0 ? 
                    <Button bsStyle='primary' onClick={() => {this.props.history.push('/')}}>Finish Session</Button> : 
                    <div>
                    <h3 style={{"font-family": 'Orbitron'}} >{min} : {sec} Remaining</h3>
                    <Button bsStyle='primary' onClick={this.handleClick}>Finish Session</Button>
                  </div>}
              {/* </Col>
            </Row>
        </Grid> */}
      </React.Fragment> 
    )
  }
}