import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';

export default function AvatarSection() {
  const { groupData } = useUser();
  
  // Default members if group data isn't available
  const members = groupData?.members || [
    { name: 'Guest', is_host: true },
    { name: 'Guest 2', is_host: false },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex px-4 py-2 overflow-x-auto scrollbar-hide"
    >
      {members.map((member, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center mr-4"
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-medium ${
            member.is_host ? 'bg-[#4C4C9D]' : 'bg-[#7A7F87]'
          }`}>
            {member.name.charAt(0).toUpperCase()}
          </div>
          <p className="text-xs mt-1 truncate max-w-[60px] text-center">
            {member.name}
            {member.is_host && <span className="ml-1">👑</span>}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}