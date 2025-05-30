// // src/roles/customer/context/UserContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react';

// const UserContext = createContext(null);
// const BASE_URL = 'https://qr-agent.onrender.com'; // Replace with your backend URL

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [groupData, setGroupData] = useState(null);
//   const [verificationStatus, setVerificationStatus] = useState('idle');

//   // Save user to localStorage whenever it changes
//   useEffect(() => {
//     if (user) localStorage.setItem('user', JSON.stringify(user));
//   }, [user]);

//   // Save group data to sessionStorage whenever it changes
//   useEffect(() => {
//     if (groupData) sessionStorage.setItem('group', JSON.stringify(groupData));
//   }, [groupData]);

//   // Send OTP request to backend
//   const sendOTP = async (phone, name) => {
//     setVerificationStatus('sending');
//     try {
//       const response = await fetch(`${BASE_URL}/request-otp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone, name }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to send OTP');
//       }

//       const data = await response.json();
//       console.log(data.message); // Log success message
//       setVerificationStatus('verifying');
//     } catch (error) {
//       console.error('Error sending OTP:', error.message);
//       setVerificationStatus('error');
//       throw error;
//     }
//   };

//   // Verify OTP with backend
//   const verifyOTP = async (otp, phone) => {
//     setVerificationStatus('verifying');
//     try {
//       const response = await fetch(`${BASE_URL}/verify-otp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone, otp }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to verify OTP');
//       }

//       const data = await response.json();
//       console.log('OTP verified successfully. Token:', data.token); // Log token
//       setVerificationStatus('success');
//     } catch (error) {
//       console.error('Error verifying OTP:', error.message);
//       setVerificationStatus('error');
//       return { success: false, error: error.message };
//     }
//   };

//   // Create a group
//   const createGroup = async (tableId, name, phone, partySize) => {
//     try {
//       const response = await fetch(`${BASE_URL}/create-group`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ tableId, name, phone, partySize }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to create group');
//       }

//       const data = await response.json();
//       console.log('Group created successfully:', data.group);
//       setGroupData(data.group); // Store group data in state
//       return { success: true, group: data.group };
//     } catch (error) {
//       console.error('Error creating group:', error.message);
//       return { success: false, error: error.message };
//     }
//   };

//   return (
//     <UserContext.Provider value={{
//       user,
//       groupData,
//       verificationStatus,
//       sendOTP,
//       verifyOTP,
//       createGroup,
//     }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// // Hook to use the UserContext
// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };
// // ---------------------------------org------------------------------------------------


import { createContext, useContext, useState, useEffect } from 'react';
import { customerApi } from '../api/customerApi';

const UserContext = createContext(null);
const BASE_URL = 'https://qr-agent.onrender.com'; // Replace with your backend URL

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('idle');
  const [organizationId, setOrganizationId] = useState(() => {
    return localStorage.getItem('organization_id') || null; // <-- use localStorage
  });

  // Ensure table_id is set in sessionStorage
  useEffect(() => {
    if (!sessionStorage.getItem('table_id')) {
      sessionStorage.setItem('table_id', 'table_default');
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Save group data to sessionStorage whenever it changes
  useEffect(() => {
    if (groupData) sessionStorage.setItem('group', JSON.stringify(groupData));
  }, [groupData]);

  // Send OTP request to backend
  const sendOTP = async (phone, name) => {
    setVerificationStatus('sending');
    try {
      const response = await fetch(`${BASE_URL}/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send OTP');
      }

      const data = await response.json();
      console.log(data.message); // Log success message
      setVerificationStatus('verifying');
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      setVerificationStatus('error');
      throw error;
    }
  };

  // Verify OTP with backend
  const verifyOTP = async (otp, phone) => {
    setVerificationStatus('verifying');
    try {
      const response = await fetch(`${BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to verify OTP');
      }

      const data = await response.json();
      console.log('OTP verified successfully. Token:', data.token); // Log token
      setVerificationStatus('success');
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      if (data.organization_id) {
        setOrganizationId(data.organization_id);
        localStorage.setItem('organization_id', data.organization_id); // <-- use localStorage
      }
      return { success: true, token: data.token }; // Return token for further use
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      setVerificationStatus('error');
      return { success: false, error: error.message };
    }
  };

  // Create a group (uses customerApi if you want, or keep the fetch)
  const createGroup = async (tableId, organizationId) => {
    try {
      const result = await customerApi.createGroup(tableId, organizationId);
      setGroupData(result); // result contains group_id, qr_url, etc.
      return result;
    } catch (error) {
      console.error('Error creating group:', error.message);
      throw error;
    }
  };

  // Join a group (new function)
  const joinGroup = async (groupId, name) => {
    try {
      const result = await customerApi.joinGroup(groupId, name);
      setGroupData(result); // result contains member_token, group_id
      return result;
    } catch (error) {
      console.error('Error joining group:', error.message);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      groupData,
       organizationId,
      verificationStatus,
      sendOTP,
      verifyOTP,
      createGroup,
      joinGroup, // <-- new function
    }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};