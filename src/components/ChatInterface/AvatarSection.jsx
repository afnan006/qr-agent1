// // // import React from 'react';
// // // import { motion } from 'framer-motion';
// // // import { useUser } from '../../context/UserContext';

// // // export default function AvatarSection() {
// // //   const { groupData } = useUser();
  
// // //   // Default members if group data isn't available
// // //   const members = groupData?.members || [
// // //     { name: 'Guest', is_host: true },
// // //     { name: 'Guest 2', is_host: false },
// // //   ];
  
// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, y: -10 }}
// // //       animate={{ opacity: 1, y: 0 }}
// // //       className="flex px-4 py-2 overflow-x-auto scrollbar-hide"
// // //     >
// // //       {members.map((member, index) => (
// // //         <motion.div
// // //           key={index}
// // //           initial={{ opacity: 0, scale: 0.8 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //           transition={{ delay: index * 0.1 }}
// // //           className="flex flex-col items-center mr-4"
// // //         >
// // //           <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-medium ${
// // //             member.is_host ? 'bg-[#4C4C9D]' : 'bg-[#7A7F87]'
// // //           }`}>
// // //             {member.name.charAt(0).toUpperCase()}
// // //           </div>
// // //           <p className="text-xs mt-1 truncate max-w-[60px] text-center">
// // //             {member.name}
// // //             {member.is_host && <span className="ml-1">👑</span>}
// // //           </p>
// // //         </motion.div>
// // //       ))}
// // //     </motion.div>
// // //   );
// // // }
// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import DynamicSubtitleBubble from './DynamicSubtitleBubble';
// // import { useChat } from '../../context/ChatContext';
// // export default function AvatarSection() {
// //   const { toggleChatMode } = useChat();



// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: -10 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       className="flex justify-center px-4 py-2"
// //     >
// //       {/* AI Avatar */}
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.8 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 0.3 }}
// //         className="flex flex-col items-center"
// //       >
// //         {/* Circular Avatar */}
// //         <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#4C4C9D] text-white text-2xl font-medium">
// //           Rest
// //         </div>
// //         {/* Label */}
// //         </motion.div>
// //       <p className="text-xs mt-2 text-[#7A7F87]">AI Assistant</p>

// //       <motion.div
// //   onClick={toggleChatMode}
// //   whileHover={{ scale: 1.05 }}
// //   whileTap={{ scale: 0.95 }}
// //   className="w-16 h-16 rounded-full flex items-center justify-center bg-[#4C4C9D] text-white text-2xl font-medium cursor-pointer"
// // >
// //   Rest
// // </motion.div>

// //       {/* Dynamic Subtitle Bubble */}
// //       <DynamicSubtitleBubble latestMessage={latestAIMessage} />
// //     </motion.div>
// //   );
// // }

// import React from 'react';
// import { motion } from 'framer-motion';
// import DynamicSubtitleBubble from './DynamicSubtitleBubble';
// import { useChat } from '../../context/ChatContext';

// export default function AvatarSection() {
//   const { messages, toggleChatMode } = useChat();

//   // Find the latest AI message
//   const latestAIMessage = messages.findLast((msg) => msg.sender === 'agent')?.text;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="flex flex-col items-center px-4 py-2"
//     >
//       {/* AI Avatar */}
//       <motion.div
//         onClick={toggleChatMode}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="w-16 h-16 rounded-full flex items-center justify-center bg-[#4C4C9D] text-white text-2xl font-medium cursor-pointer"
//       >
//         Rest
//       </motion.div>

//       {/* Label */}
//       <p className="text-xs mt-2 text-[#7A7F87]">AI Assistant</p>

//       {/* Dynamic Subtitle Bubble */}
//       <DynamicSubtitleBubble latestMessage={latestAIMessage} />
//     </motion.div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DynamicSubtitleBubble from './DynamicSubtitleBubble';
import { useChat } from '../../context/ChatContext';

export default function AvatarSection() {
  const { messages, toggleChatMode } = useChat();
  const [latestAIMessage, setLatestAIMessage] = useState('');

  // Update the latest AI message whenever the messages array changes
  useEffect(() => {
    const agentMessage = messages.findLast((msg) => msg.sender === 'agent')?.text;
    setLatestAIMessage(agentMessage || '');
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center px-4 py-2"
    >
      {/* AI Avatar */}
      <motion.div
        onClick={toggleChatMode}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 rounded-full flex items-center justify-center bg-[#4C4C9D] text-white text-2xl font-medium cursor-pointer"
      >
        Rest
      </motion.div>

      {/* Label */}
      <p className="text-xs mt-2 text-[#7A7F87]">AI Assistant</p>

      {/* Dynamic Subtitle Bubble */}
      <DynamicSubtitleBubble latestMessage={latestAIMessage} />
    </motion.div>
  );
}