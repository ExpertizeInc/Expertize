import React, { Component } from 'react'

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 100
    }
    this.intervalHandle
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

  render() {
    const { time } = this.state
    const min = Math.floor(time / 60)
    const sec = time % 60 === 0 ? '00' : time % 60 > 9 ?  time % 60 : ('0' + (time % 60).toString())
    return (
      <div>
        {time > 0 ? <h3>{min} MIN : {sec} SEC Remaining</h3> : <button>Finish</button>}
      </div>
    )
  }
}