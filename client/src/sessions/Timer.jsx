import React, { Component } from 'react'
import Survey from './Survey.jsx'
import { Link } from 'react-router-dom'

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
    console.log(this.state.survey, 'stateo f survey at handleclick')
    this.setState({ survey: true, time: null }, () => clearInterval(this.intervalHandle))
  }

  render() {
    const { time, survey } = this.state
    const { user, session } = this.props
    const min = Math.floor(time / 60)
    const sec = time % 60 === 0 ? '00' : time % 60 > 9 ?  time % 60 : ('0' + (time % 60).toString())
    return (
      // this.state.survey ?
      <div>
        {/* {(time <= 0 || survey) && user.username === session.pupil.username ? 
        <Survey session={session} /> : <h3>{min} MIN : {sec} SEC Remaining</h3>} 
        {(time <= 0 || survey) && user.username === session.pupil.username ? 
        null : <Link to='/' ><button onClick={this.handleClick}>Finish</button></Link>} */}
        {
          user.username === session.pupil.username ? 
            time <= 0 || survey ?
              <Survey session={session} /> :
              <div>
              <h3>{min} MIN : {sec} SEC Remaining</h3>
              <button onClick={this.handleClick}>Finish Session</button>
              </div>
            :
            time <= 0 ? 
              <button onClick={() => this.props.history.push('/')}>Finish Session</button> : 
              <div>
              <h3>{min} MIN : {sec} SEC Remaining</h3>
              <button onClick={this.handleClick}>Finish Session</button>
            </div>
        }
      </div> 
    )
  }
}