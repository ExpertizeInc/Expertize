import React, { Component } from 'react'

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 10
    }
    this.intervalHandle
    this.tick = this.tick.bind(this)
    this.startTimer = this.startTimer.bind(this)
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
    this.props.handleTimerClick(e)
    this.intervalHandle = setInterval(this.tick, 1000)
  }

  render() {
    return (
      <div>
        <button onClick={(e) => this.startTimer(e)}>start countdown</button>
        <div>{this.state.time}</div>
      </div>
    )
  }
}