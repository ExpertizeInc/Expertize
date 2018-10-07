import React from 'react';

export const ChatBox = ({messages}) => (
  <div>
  {messages.map((message, i) => <div key={i}>{console.log(message)}{message}</div>)}
  </div>
);