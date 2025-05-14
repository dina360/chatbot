// src/components/ChatMessage.jsx
import React from 'react';
import ChatbotIcon from './ChatbotIcon';

const ChatMessage = ({ chat }) => {
  const isBot = chat.role === 'model';

  return (
    <div className={`message ${isBot ? 'bot' : 'user'}-message`}>
      {isBot && (
        <div className="icon-wrapper">
          <ChatbotIcon />
        </div>
      )}
      <div className="bubble">
        <p className="message-text">{chat.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
