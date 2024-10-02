import React, { useState } from 'react';
import Message from './Message';
import Input from './Input';
import axios from 'axios';
import './ChatBox.css'; // Import the CSS file for styling

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_GEMINI_AI_API_KEY; // Use your API key

  const sendMessage = async (message) => {
    const userMessage = { text: message, sender: 'You' };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);

      const botMessage = {
        text: response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini',
        sender: 'Bot',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      const errorMessage = error.response
        ? `Error: ${error.response.data.message}`
        : 'Error: Unable to reach Gemini API';
      setMessages((prev) => [
        ...prev,
        { text: errorMessage, sender: 'System' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
        {loading && <Message text="Thinking..." sender="Gemini" />}
      </div>
      <Input sendMessage={sendMessage} />
    </div>
  );
};

export default ChatBox;
