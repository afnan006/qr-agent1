// // import { createContext, useContext, useState, useEffect } from 'react';
// // import { orgadminApi } from '../api/orgadminApi';

// // const OrgAdminAuthContext = createContext(null);

// // export function OrgAdminAuthProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const token = localStorage.getItem('orgadmin_token');
// //     const userData = localStorage.getItem('orgadmin_user');
    
// //     if (token && userData) {
// //       try {
// //         setUser(JSON.parse(userData));
// //       } catch (err) {
// //         console.error('Error parsing auth data:', err);
// //         logout();
// //       }
// //     }
    
// //     setLoading(false);
// //   }, []);

// //   const login = async (email, password) => {
// //     try {
// //       setError(null);
// //       setLoading(true);
      
// //       const response = await orgadminApi.login({ email, password });
      
// //       localStorage.setItem('orgadmin_token', response.token);
// //       localStorage.setItem('orgadmin_user', JSON.stringify(response.user));
      
// //       setUser(response.user);
// //       return response;
// //     } catch (err) {
// //       setError(err.message);
// //       throw err;
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('orgadmin_token');
// //     localStorage.removeItem('orgadmin_user');
// //     setUser(null);
// //   };

// //   return (
// //     <OrgAdminAuthContext.Provider
// //       value={{
// //         user,
// //         loading,
// //         error,
// //         login,
// //         logout,
// //         isAuthenticated: !!user,
// //       }}
// //     >
// //       {children}
// //     </OrgAdminAuthContext.Provider>
// //   );
// // }

// // export function useOrgAdminAuth() {
// //   const context = useContext(OrgAdminAuthContext);
// //   if (!context) {
// //     throw new Error('useOrgAdminAuth must be used within an OrgAdminAuthProvider');
// //   }
// //   return context;
// // }
// // src/roles/orgadmin/context/OrgAdminAuthContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react';
// import { orgadminApi } from '../api/orgadminApi';
// import {jwtDecode} from 'jwt-decode';

// const OrgAdminAuthContext = createContext(null);

// export function OrgAdminAuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('orgadmin_token');
//     if (token) {
//       const fetchUser = async () => {
//         try {
//           const userData = await orgadminApi.getUserProfile(); // Assuming you have a getUserProfile API
//           setUser(userData);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchUser();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (credentials) => {
//     try {
//       const { token, user } = await orgadminApi.login(credentials);
//       localStorage.setItem('orgadmin_token', token);
//       localStorage.setItem('orgadmin_user', JSON.stringify(user));
//       setUser(user);
//     } catch (err) {
//       throw new Error(err.message || 'Login failed');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('orgadmin_token');
//     localStorage.removeItem('orgadmin_user');
//     setUser(null);
//   };

//   return (
//     <OrgAdminAuthContext.Provider
//       value={{
//         user,
//         loading,
//         error,
//         login,
//         logout,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </OrgAdminAuthContext.Provider>
//   );
// }

// export function useOrgAdminAuth() {
//   const context = useContext(OrgAdminAuthContext);
//   if (!context) {
//     throw new Error('useOrgAdminAuth must be used within an OrgAdminAuthProvider');
//   }
//   return context;
// }
import { createContext, useContext, useState, useEffect } from 'react';
import { orgadminApi } from '../api/orgadminApi';
import { jwtDecode } from 'jwt-decode';

const OrgAdminAuthContext = createContext(null);

export function OrgAdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('orgadmin_token');
    if (token && token.split('.').length === 3) {
      try {
        const decodedToken = jwtDecode(token);
        const organizationId = decodedToken.identity?.org_id;
        if (organizationId) {
          localStorage.setItem('organization_id', organizationId);
        }
        // Fetch user profile data
        const fetchUser = async () => {
          try {
            const userData = await orgadminApi.getUserProfile();
            setUser(userData);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchUser();
      } catch (decodeError) {
        console.error('Failed to decode token:', decodeError);
        setError('Invalid token');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const { token, user } = await orgadminApi.login(credentials);
      localStorage.setItem('orgadmin_token', token);
      setUser(user);

      // Decode token to extract organization ID
      if (token && token.split('.').length === 3) {
        try {
          const decodedToken = jwtDecode(token);
          const organizationId = decodedToken.identity?.org_id;
          if (organizationId) {
            localStorage.setItem('organization_id', organizationId);
          }
        } catch (decodeError) {
          console.error('❌ Failed to decode token:', decodeError.message);
        }
      }
    } catch (err) {
      throw new Error(err.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('orgadmin_token');
    localStorage.removeItem('organization_id');
    setUser(null);
  };

  return (
    <OrgAdminAuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </OrgAdminAuthContext.Provider>
  );
}

export function useOrgAdminAuth() {
  const context = useContext(OrgAdminAuthContext);
  if (!context) {
    throw new Error('useOrgAdminAuth must be used within an OrgAdminAuthProvider');
  }
  return context;
}