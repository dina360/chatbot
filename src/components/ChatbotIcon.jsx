// src/components/ChatbotIcon.jsx
import React from 'react';

const ChatbotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="35"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Bulle de discussion */}
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    {/* Trois points */}
    <circle cx="8.5" cy="11.5" r="1" />
    <circle cx="12" cy="11.5" r="1" />
    <circle cx="15.5" cy="11.5" r="1" />
  </svg>
);

export default ChatbotIcon;
