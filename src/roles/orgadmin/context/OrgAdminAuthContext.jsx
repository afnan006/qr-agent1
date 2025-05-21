import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { orgadminApi } from '../api/orgadminApi';

const OrgAdminAuthContext = createContext(null);

export function OrgAdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('orgadmin_token1');
    if (token && token.split('.').length === 3) {
      try {
        const decodedToken = jwtDecode(token);
        const organizationId = decodedToken.identity?.org_id;
        if (organizationId) {
          localStorage.setItem('organization_id', organizationId);
        }
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
      localStorage.setItem('orgadmin_token1', token);
      setUser(user);
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
    localStorage.removeItem('orgadmin_token1');
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