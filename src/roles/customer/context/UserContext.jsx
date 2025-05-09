import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Try to get user from localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [groupData, setGroupData] = useState(() => {
    // Try to get group data from sessionStorage on initial load
    const savedGroup = sessionStorage.getItem('group');
    return savedGroup ? JSON.parse(savedGroup) : null;
  });
  
  const [verificationStatus, setVerificationStatus] = useState('idle'); // idle, sending, verifying, success, error
  
  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);
  
  // Save group data to sessionStorage whenever it changes
  useEffect(() => {
    if (groupData) {
      sessionStorage.setItem('group', JSON.stringify(groupData));
    }
  }, [groupData]);
  
  // Mock functions for OTP verification
  const sendOTP = async (phone) => {
    setVerificationStatus('sending');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock success
    setVerificationStatus('verifying');
    return { success: true, otp: '1234' }; // In real app, OTP would be sent to user's phone
  };
  
  const verifyOTP = async (otp, phone) => {
    setVerificationStatus('verifying');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock verification (in real app, this would verify with backend)
    if (otp === '1234') {
      setVerificationStatus('success');
      return { success: true };
    } else {
      setVerificationStatus('error');
      return { success: false, error: 'Invalid OTP' };
    }
  };
  
  const createGroup = (tableId, name, phone, partySize) => {
    // Generate a mock unique group ID
    const groupId = `group_${Date.now()}`;
    
    const newGroup = {
      group_id: groupId,
      table_id: tableId,
      host: { name, phone },
      party_size: partySize,
      created_at: new Date().toISOString(),
      members: [{ name, phone, is_host: true }]
    };
    
    setGroupData(newGroup);
    setUser({ name, phone });
    
    return groupId;
  };
  
  const joinGroup = (groupId, name, phone) => {
    setGroupData(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        members: [...prev.members, { name, phone, is_host: false }]
      };
    });
    
    setUser({ name, phone });
  };
  
  return (
    <UserContext.Provider value={{
      user,
      groupData,
      verificationStatus,
      sendOTP,
      verifyOTP,
      createGroup,
      joinGroup
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};