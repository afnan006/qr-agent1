// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import ChatNavbar from '../components/ChatInterface/ChatNavbar';
// // import AvatarSection from '../components/ChatInterface/AvatarSection';
// // import MessageBubble from '../components/ChatInterface/MessageBubble';
// // import TypingIndicator from '../components/ChatInterface/TypingIndicator';
// // import InputSection from '../components/ChatInterface/InputSection';
// // import CartSlideOver from '../components/PaymentPanel/CartSlideOver';
// // import { useChat } from '../context/ChatContext';

// // const displayedMessages = isFullChatMode ? messages : messages.filter((msg) => msg.sender !== 'agent');
// // const ChatPage = () => {
// //   const { messages, isTyping, isFullChatMode } = useChat();
  
// //   const filteredMessages = messages.filter((msg) => msg.sender !== 'agent');

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="flex flex-col h-screen bg-white"
// //     >
// //       <ChatNavbar />
// //       <AvatarSection />
      
// //       <div className="flex-1 overflow-y-auto p-4">
// //         {messages.map((message, index) => (
// //           <MessageBubble 
// //             key={message.id} 
// //             message={message} 
// //             isLast={index === messages.length - 1} 
// //           />
// //         ))}
        
// //         {isTyping && <TypingIndicator />}
// //       </div>
      
// //       <InputSection />
// //       <CartSlideOver />
// //     </motion.div>
// //   );
// // };

// // export default ChatPage;

// import React from 'react';
// import { motion } from 'framer-motion';
// import ChatNavbar from '../components/ChatInterface/ChatNavbar';
// import AvatarSection from '../components/ChatInterface/AvatarSection';
// import MessageBubble from '../components/ChatInterface/MessageBubble';
// import TypingIndicator from '../components/ChatInterface/TypingIndicator';
// import InputSection from '../components/ChatInterface/InputSection';
// import CartSlideOver from '../components/PaymentPanel/CartSlideOver';
// import { useChat } from '../context/ChatContext';

// const ChatPage = () => {
//   const { messages, isTyping, isFullChatMode } = useChat();

//   const displayedMessages = isFullChatMode
//     ? messages
//     : messages.filter((msg) => msg.sender !== 'agent');

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="flex flex-col h-screen bg-white"
//     >
//       <ChatNavbar />
//       <AvatarSection />

//       <div className="flex-1 overflow-y-auto p-4">
//         {displayedMessages.map((message, index) => (
//           <MessageBubble
//             key={message.id}
//             message={message}
//             isLast={index === displayedMessages.length - 1}
//           />
//         ))}

//         {isTyping && <TypingIndicator />}
//       </div>

//       <InputSection />
//       <CartSlideOver />
//     </motion.div>
//   );
// };

// export default ChatPage;

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ChatNavbar from '../components/ChatInterface/ChatNavbar';
import AvatarSection from '../components/ChatInterface/AvatarSection';
import MessageBubble from '../components/ChatInterface/MessageBubble';
import InputSection from '../components/ChatInterface/InputSection';
import CartSlideOver from '../components/PaymentPanel/CartSlideOver';
import { useChat } from '../context/ChatContext';

const ChatPage = () => {
  const { messages, isFullChatMode } = useChat();
  const chatEndRef = useRef(null);

  // Filter messages based on chat mode
  const displayedMessages = isFullChatMode
    ? messages
    : messages.filter((msg) => msg.sender !== 'agent');

  // Auto-scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen bg-white"
    >
      {/* Chat Navbar */}
      <ChatNavbar />

      {/* Avatar Section */}
      <AvatarSection />

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {displayedMessages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isLast={index === displayedMessages.length - 1}
          />
        ))}

        {/* Anchor to scroll to the latest message */}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input Section */}
      <InputSection />

      {/* Cart Slide Over */}
      <CartSlideOver />
    </motion.div>
  );
};

export default ChatPage;