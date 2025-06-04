import React, { createContext, useContext, useState, useEffect } from 'react';
import { customerApi } from '../api/customerApi'; // <-- Add this import

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(() => {
    // Try to get messages from sessionStorage on initial load
    const savedMessages = sessionStorage.getItem('chat_messages');
    return savedMessages ? JSON.parse(savedMessages) : [
      {
        id: 'welcome',
        sender: 'agent',
        text: 'Welcome to our restaurant! How can I assist you today?',
        timestamp: new Date().toISOString()
      }
    ];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [isFullChatMode, setIsFullChatMode] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [panelData, setPanelData] = useState(null);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (text, sender = 'user') => {
    const newMessage = {
      id: `msg_${Date.now()}`,
      sender,
      text,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, newMessage]);

    // --- MOCK PANEL TRIGGERS ---
    const lowerText = text.trim().toLowerCase();
    if (lowerText === 'cart') {
      setActivePanel('cart');
      setPanelData(await customerApi.getMockCart());
      return newMessage;
    }
    if (lowerText === 'menu') {
      setActivePanel('menu');
      setPanelData(await customerApi.getMockMenu());
      return newMessage;
    }
    if (lowerText === 'payment') {
      setActivePanel('payment');
      setPanelData(await customerApi.getMockPayment());
      return newMessage;
    }
    if (lowerText === 'orders') {
      setActivePanel('orders');
      setPanelData(await customerApi.getMockOrders());
      return newMessage;
    }
    // --- END MOCK PANEL TRIGGERS ---

    // If user sent a message, simulate agent typing and response
    if (sender === 'user') {
      simulateAgentResponse(text);
    }

    return newMessage;
  };

  // Mock function to simulate agent typing and response
  const simulateAgentResponse = (userMessage) => {
    // Show typing indicator
    setIsTyping(true);

    // Random response time between 1-3 seconds
    const responseTime = 1000 + Math.random() * 2000;

    setTimeout(() => {
      // Generate mock response based on user message
      let response = '';

      if (userMessage.toLowerCase().includes('menu')) {
        response = 'Our menu features a variety of dishes. Would you like to see our specials today?';
      } else if (userMessage.toLowerCase().includes('special')) {
        response = "Today's specials are Truffle Pasta, Grilled Sea Bass, and Chocolate Soufflé.";
      } else if (userMessage.toLowerCase().includes('order')) {
        response = 'Great! What would you like to order?';
      } else if (userMessage.toLowerCase().includes('payment')) {
        response = 'You can pay through our app using credit card or digital wallets.';
      } else if (userMessage.toLowerCase().includes('thank')) {
        response = 'You\'re welcome! Is there anything else I can help you with?';
      } else {
        response = 'How else can I assist you with your dining experience today?';
      }

      // Send agent response and reset typing indicator
      sendMessage(response, 'agent');
      setIsTyping(false); // Reset typing indicator
    }, responseTime);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'agent',
        text: 'Welcome to our restaurant! How can I assist you today?',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isTyping,
        sendMessage,
        clearChat,
        isFullChatMode,
        toggleChatMode: () => setIsFullChatMode((prev) => !prev),
        activePanel,
        setActivePanel,
        panelData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};