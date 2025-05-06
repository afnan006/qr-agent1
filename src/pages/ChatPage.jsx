import React from 'react';
import { motion } from 'framer-motion';
import ChatNavbar from '../components/ChatInterface/ChatNavbar';
import AvatarSection from '../components/ChatInterface/AvatarSection';
import MessageBubble from '../components/ChatInterface/MessageBubble';
import TypingIndicator from '../components/ChatInterface/TypingIndicator';
import InputSection from '../components/ChatInterface/InputSection';
import CartSlideOver from '../components/PaymentPanel/CartSlideOver';
import { useChat } from '../context/ChatContext';

const ChatPage = () => {
  const { messages, isTyping } = useChat();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen bg-white"
    >
      <ChatNavbar />
      <AvatarSection />
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            isLast={index === messages.length - 1} 
          />
        ))}
        
        {isTyping && <TypingIndicator />}
      </div>
      
      <InputSection />
      <CartSlideOver />
    </motion.div>
  );
};

export default ChatPage;