import React, { Component } from 'react'
import OpenTok from 'opentok';


const Video = () => {
  let opentok = new OpenTok('46197542', 'b7f3e5f595b2f2e85047e370632074938501d031')
  let token;
  console.log('this is opentok', opentok)
  opentok.createSession((err, session) => {
    if (err) console.error('error creating session', err)
    else {
      console.log('session created 1 ', session)
      token = session.generateToken()
      console.log('this is token', token)
    }
  })
  return (
  <div>
    <h1>Video</h1>
    <iframe
        src="https://tokbox.com/embed/embed/ot-embed.js?embedId=91632a05-517e-4418-bcd2-ab58ff889970&room=DEFAULT_ROOM&iframe=true"
        width="800px"
        height="640px"
        allow="microphone; camera"
      ></iframe>
    
  </div>)
}

export default Video