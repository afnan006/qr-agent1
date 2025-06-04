import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatNavbar from '../components/ChatInterface/ChatNavbar';
import AvatarSection from '../components/ChatInterface/AvatarSection';
import MessageBubble from '../components/ChatInterface/MessageBubble';
import InputSection from '../components/ChatInterface/InputSection';
import MenuCarousel from '../components/ChatInterface/MenuCarousel';
import CartDetailsList from '../components/ChatInterface/CartDetailsList';
import OrderedItemsList from '../components/ChatInterface/OrderedItemsList';
import PaymentDetails from '../components/ChatInterface/PaymentDetails';
import { useChat } from '../context/ChatContext';

const ChatPage = () => {
  const {
    messages,
    setMessages,
    isFullChatMode,
    activePanel,
    setActivePanel,
    panelData,
  } = useChat();

  const chatEndRef = useRef(null);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const sendMessage = (text) => {
    const newMessage = { id: Date.now(), sender: 'user', text, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, newMessage]);
    handleUserMessage(text); // Trigger component based on message content
  };

  return (
    <motion.div className="flex flex-col h-screen">
      {/* Chat Navbar */}
      <ChatNavbar />

      {/* Chat Interface */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Dynamic Panels */}
      <AnimatePresence>
        {activePanel === 'menu' && <MenuCarousel items={Array.isArray(panelData) ? panelData : panelData?.items || []} />}
        {activePanel === 'cart' && <CartDetailsList items={panelData?.items || panelData || []} />}
        {activePanel === 'orders' && <OrderedItemsList items={panelData?.items || panelData || []} />}
        {activePanel === 'payment' && (
          <PaymentDetails
            total={panelData?.total || 0}
            tax={panelData?.tax || 0}
            grandTotal={panelData?.grandTotal || 0}
            onPay={() => alert('Payment Initiated')}
          />
        )}
      </AnimatePresence>

      {/* Input Section */}
      <InputSection onSendMessage={sendMessage} />
    </motion.div>
  );
};

export default ChatPage;