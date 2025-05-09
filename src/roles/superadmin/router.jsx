import { Routes, Route, Navigate } from 'react-router-dom';
import { SuperAdminAuthProvider } from './context/SuperAdminAuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import Admins from './pages/Admins';
import OrgDetails from './pages/OrgDetails';

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('superadmin_token');
  if (!token) {
    return <Navigate to="/superadmin/login" replace />;
  }
  return children;
}

export default function SuperAdminRouter() {
  return (
    <SuperAdminAuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/organizations"
          element={
            <ProtectedRoute>
              <Organizations />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/organizations/:id"
          element={
            <ProtectedRoute>
              <OrgDetails />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admins"
          element={
            <ProtectedRoute>
              <Admins />
            </ProtectedRoute>
          }
        />
        
        {/* Redirect /superadmin to dashboard if authenticated, login if not */}
        <Route
          path="/"
          element={
            localStorage.getItem('superadmin_token') ? (
              <Navigate to="/superadmin/dashboard" replace />
            ) : (
              <Navigate to="/superadmin/login" replace />
            )
          }
        />
      </Routes>
    </SuperAdminAuthProvider>
  );
}