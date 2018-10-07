import React from 'react';

const ChatBox = ({messages}) => (
  <div>
  {messages.map((message, i) => <div key={i}>{console.log(message)}{message}</div>)}
  </div>
)
 
export default ChatBox;