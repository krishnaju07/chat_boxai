import React, { useState } from 'react';
import Message from './Message';
import Input from './input';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  console.log('Using API Key:', apiKey);

  const sendMessage = async (message) => {
    const userMessage = { text: message, sender: 'You' };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: message }],
          }),
        }
      );

      console.log('Response Status:', response.status); // Log the response status

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response Data:', data); // Log the response data

      const botMessage = {
        text: data.choices[0].message.content,
        sender: 'ChatGPT',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching data from API:', error);
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
        {loading && <Message text="Thinking..." sender="ChatGPT" />}
      </div>
      <Input sendMessage={sendMessage} />
    </div>
  );
};

export default ChatBox;
