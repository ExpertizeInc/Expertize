import React, { Component } from 'react'
import userImage from '../../dist/images/user.png';


class ChatLog extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { messages, session, me } = this.props
    const pupilImage = session.pupil.image ? session.pupil.image : userImage
    const expertImage = session.expert.image ? session.expert.image : userImage
    let check = (str) => str === me ? 'userOne' : 'target'
    return(
    <div className="chatlogs">
      {messages && messages.map((message, i) => (
      <div key={i} className={`chat ${check(message.from)}`}>
        <img src={message.from === session.expert.username ? expertImage : pupilImage}></img>
        <p className="chat-message">{message.msg}</p>	
      </div>
      ))}
    </div>
    )
  }
}

export default ChatLog