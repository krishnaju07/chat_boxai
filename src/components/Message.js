import React from 'react';

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender === 'You' ? 'sent' : 'received'}`}>
      <span className="sender">{sender}: </span>
      <span className="text">{text}</span>
    </div>
  );
};

export default Message;
