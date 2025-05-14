import React, { useState, useRef, useEffect } from 'react';
import ChatbotIcon from './components/ChatbotIcon';
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';
import './index.css';

// Pour debug
console.log('→ import.meta.env:', import.meta.env);
console.log('VITE_API_URL →', import.meta.env.VITE_API_URL);
console.log('VITE_API_KEY →', import.meta.env.VITE_API_KEY);

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL; // '/gpt/api.php'
    const apiKey = import.meta.env.VITE_API_KEY;

    const lastMsg = history[history.length - 1];
    const userText = lastMsg?.role === 'user' ? lastMsg.text : '';
    // On force la réponse en français
    const fullPrompt = `Vous êtes un assistant qui répond toujours en français. Message de l'utilisateur : ${userText}`;

    try {
      const response = await fetch(
        `${apiUrl}?prompt=${encodeURIComponent(fullPrompt)}&api_key=${apiKey}`
      );
      const text = await response.text();
      console.log('Réponse brute de l’API →', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error('Erreur parsing JSON');
        setChatHistory(prev => [...prev, { role: 'model', text: 'Erreur : réponse non JSON.' }]);
        return;
      }

      const replyText = data.reply || data.content || data.error || 'Erreur : réponse vide.';
      setChatHistory(prev => [...prev, { role: 'model', text: replyText }]);
    } catch (error) {
      console.error('Erreur réseau →', error);
      setChatHistory(prev => [...prev, { role: 'model', text: 'Erreur réseau lors de l’appel à l’API.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll auto
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistory]);

  return (
    <div className="chat-container">
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-outlined">keyboard_arrow_down</button>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          {chatHistory.map((msg, i) => (
            <ChatMessage key={i} chat={msg} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
