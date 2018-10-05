import React, { Component } from 'react';

const ChatBox = ({messages}) => (
  <div>
  {messages.map((message,i) => <div id={i}>{message}</div>)}
  </div>
)
 
export default ChatBox;