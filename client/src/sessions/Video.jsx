import React, { Component } from 'react'
import Timer from './Timer.jsx'

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
    const { user } = this.props
    // console.log('duration of video', match.location.state.session.question.duration)
    console.log('session', this.props.match.location.state.session)
    console.log(roomname, 'expert', expert, 'pupil',pupil)
    return (
      <React.Fragment>
        <Timer user={user} session={this.props.match.location.state.session} minutes={this.props.match.location.state.session.question.duration}/>
        <h1>Video</h1>
        <iframe src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=91632a05-517e-4418-bcd2-ab58ff889970&iframe=true&room=${roomname}`} width='800' height='640' allow="microphone; camera"/>
      </React.Fragment>
    )
  }
};