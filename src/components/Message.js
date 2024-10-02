import React from 'react';

const Message = ({ text, sender, timestamp }) => {
  return (
    <div className={`message ${sender === 'You' ? 'you' : 'gemini'}`}>
      <div className="message-content">
        <span className="text">{text}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
    </div>
  );
};

export default Message;
