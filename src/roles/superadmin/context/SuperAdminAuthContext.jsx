// import { createContext, useContext, useState, useEffect } from 'react';
// import { superadminApi } from '../api/superadminApi';

// const SuperAdminAuthContext = createContext(null);

// export function SuperAdminAuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Check for existing auth on mount
//   useEffect(() => {
//     const token = localStorage.getItem('superadmin_token');
//     const userData = localStorage.getItem('superadmin_user');
    
//     if (token && userData) {
//       try {
//         setUser(JSON.parse(userData));
//       } catch (err) {
//         console.error('Error parsing auth data:', err);
//         logout();
//       }
//     }
    
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       setError(null);
//       setLoading(true);
      
//       const response = await superadminApi.login({ email, password });
      
//       localStorage.setItem('superadmin_token', response.token);
//       localStorage.setItem('superadmin_user', JSON.stringify(response.user));
      
//       setUser(response.user);
//       return response;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('superadmin_token');
//     localStorage.removeItem('superadmin_user');
//     setUser(null);
//   };

//   return (
//     <SuperAdminAuthContext.Provider
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
//     </SuperAdminAuthContext.Provider>
//   );
// }

// export function useSuperAdminAuth() {
//   const context = useContext(SuperAdminAuthContext);
//   if (!context) {
//     throw new Error('useSuperAdminAuth must be used within a SuperAdminAuthProvider');
//   }
//   return context;
// }
import { createContext, useContext, useState, useEffect } from 'react';
import { superadminApi } from '../api/superadminApi';

const SuperAdminAuthContext = createContext(null);

export function SuperAdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('superadmin_token');
    const userData = localStorage.getItem('superadmin_user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.error('Error parsing auth data:', err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const response = await superadminApi.login({ email, password });
      localStorage.setItem('superadmin_token', response.superadmin_token);
      localStorage.setItem('superadmin_user', JSON.stringify(response.user));
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('superadmin_token');
    localStorage.removeItem('superadmin_user');
    setUser(null);
  };

  return (
    <SuperAdminAuthContext.Provider
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
    </SuperAdminAuthContext.Provider>
  );
}

export function useSuperAdminAuth() {
  const context = useContext(SuperAdminAuthContext);
  if (!context) {
    throw new Error('useSuperAdminAuth must be used within a SuperAdminAuthProvider');
  }
  return context;
}