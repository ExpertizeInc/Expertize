import React, { Component } from 'react'
import Timer from './loggedInHome/Timer.jsx'
import OpenTok from 'opentok';

// replace these values with those generated in your TokBox Account

const sessionId = "2_MX40NjE5NzU0Mn5-MTUzODYxMDA3Nzg1NX5JYzRaayt5eEdZWExDazkyZ0s3MDB0K2Z-UH4"
const token = "T1==cGFydG5lcl9pZD00NjE5NzU0MiZzaWc9YTgzYzMyYTM2MzIwZjJmYWEyNTc5MWFjYzg0MzI4MDFlNjczZTMzYjpzZXNzaW9uX2lkPTJfTVg0ME5qRTVOelUwTW41LU1UVXpPRFl4TURBM056ZzFOWDVKWXpSYWF5dDVlRWRaV0V4RGF6a3laMHMzTURCMEsyWi1VSDQmY3JlYXRlX3RpbWU9MTUzODYxMDA3OCZub25jZT0wLjY4NTAyMzEzMTMzNjk3MjYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUzODY5NjQ3OCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

// initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) alert(error.message);
}

function initializeSession(a,b) {
  var apiKey = "46197542";
  var session = OT.initSession(apiKey, a);
  console.log('ot', OT);
  // Subscribe to a newly created stream
  session.on('streamCreated', (event) => {
  session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });
  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(b, (error) => {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}

export default class Video extends Component {
  // let opentok = new OpenTok('46197542', 'b7f3e5f595b2f2e85047e370632074938501d031')
  // let token = null;
  // let sessionId = null
  // console.log('this is opentok', opentok)
  // opentok.createSession((err, session) => {
  //   if (err) console.error('error creating session', err)
  //   else {
  //     console.log('session created 1 ', session)
  //     sessionId = session.sessionId
      
  //     token = session.generateToken()
  //     console.log('sessionid',sessionId)
  //     console.log('this is token', token)
  //     initializeSession(sessionId,token)
  //   }
  // })
  constructor(props) {
    super(props)
    this.state = {
      roomname: '',
      showframe: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  // }
  // var sessionId = "2_MX40NjE5NzU0Mn5-MTUzODYxMDA3Nzg1NX5JYzRaayt5eEdZWExDazkyZ0s3MDB0K2Z-UH4"
  // var token = "T1==cGFydG5lcl9pZD00NjE5NzU0MiZzaWc9YTgzYzMyYTM2MzIwZjJmYWEyNTc5MWFjYzg0MzI4MDFlNjczZTMzYjpzZXNzaW9uX2lkPTJfTVg0ME5qRTVOelUwTW41LU1UVXpPRFl4TURBM056ZzFOWDVKWXpSYWF5dDVlRWRaV0V4RGF6a3laMHMzTURCMEsyWi1VSDQmY3JlYXRlX3RpbWU9MTUzODYxMDA3OCZub25jZT0wLjY4NTAyMzEzMTMzNjk3MjYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUzODY5NjQ3OCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";
  // // initializeSession(sessionId, token)
  // var room = 'yoooooooooooooooooooooooooooo'
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
    // const { roomname, showframe } = this.state;
    const expert = this.props.location.state.session.expert.username
    const pupil = this.props.location.state.session.pupil.username
    const roomname = expert + pupil
    const { location } = this.props
    // console.log('duration of video', match.location.state.session.question.duration)
    console.log('session', this.props.location.state.session)
    console.log(roomname, 'expert', expert, 'pupil',pupil)
    return (
      <React.Fragment>
        <Timer minutes={this.props.location .state.session.question.duration}/>
        <h1>Video</h1>
        {/* <form>
          <input type="text" onChange={this.handleChange} value={roomname}/>
          <button onClick={this.handleClick}>Roomname</button>
        </form> */}
        <iframe src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=91632a05-517e-4418-bcd2-ab58ff889970&iframe=true&room=${roomname}`} width='800' height='640' allow="microphone; camera"/>
      </React.Fragment>
    )
  }
};