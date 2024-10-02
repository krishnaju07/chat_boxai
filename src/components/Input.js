import React, { useState } from 'react';
import './Input.css'; // Import CSS file for styling

const Input = ({ sendMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="input-field"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
};

export default Input;
