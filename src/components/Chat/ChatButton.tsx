
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import ChatInterface from './ChatInterface';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen)
  return (
    <>
      <button
        onClick={() => setIsOpen((prevOpen) => (!prevOpen))}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-hpe-green hover:bg-hpe-green/90 text-white shadow-lg transition-all duration-300 hover:scale-105 z-40"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>

      <ChatInterface isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatButton;
