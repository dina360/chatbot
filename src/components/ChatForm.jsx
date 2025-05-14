// src/components/ChatForm.jsx
import React, { useRef } from 'react';

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse, isLoading }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;           // Ne rien faire si déjà loading
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = '';

    const newHistory = [...chatHistory, { role: 'user', text: userMessage }];
    setChatHistory(newHistory);
    generateBotResponse(newHistory);

  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Message..."
        className="message-input"
        ref={inputRef}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="material-symbols-rounded"
        disabled={isLoading}
      >
        {isLoading ? '...' : 'arrow_upward'}
      </button>
    </form>
  );
};

export default ChatForm;
