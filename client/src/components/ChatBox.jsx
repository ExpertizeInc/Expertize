import React, { Component } from 'react';

const ChatBox = ({messages}) => (
  <div>
  {messages.map(message => <div>{console.log(message)}{message}</div>)}
  </div>
)
 
export default ChatBox;