// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import { SuperAdminAuthProvider } from './context/SuperAdminAuthContext';
// // import Login from './pages/Login';
// // import Dashboard from './pages/Dashboard';
// // import Organizations from './pages/Organizations';
// // import Admins from './pages/Admins';
// // import OrgDetails from './pages/OrgDetails';

// // // Protected Route wrapper
// // function ProtectedRoute({ children }) {
// //   const token = localStorage.getItem('superadmin_token');
// //   if (!token) {
// //     return <Navigate to="/superadmin/login" replace />;
// //   }
// //   return children;
// // }

// // export default function SuperAdminRouter() {
// //   return (
// //     <SuperAdminAuthProvider>
// //       <Routes>
// //         <Route path="/login" element={<Login />} />
        
// //         <Route
// //           path="/dashboard"
// //           element={
// //             <ProtectedRoute>
// //               <Dashboard />
// //             </ProtectedRoute>
// //           }
// //         />
        
// //         <Route
// //           path="/organizations"
// //           element={
// //             <ProtectedRoute>
// //               <Organizations />
// //             </ProtectedRoute>
// //           }
// //         />
        
// //         <Route
// //           path="/organizations/:id"
// //           element={
// //             <ProtectedRoute>
// //               <OrgDetails />
// //             </ProtectedRoute>
// //           }
// //         />
        
// //         <Route
// //           path="/admins"
// //           element={
// //             <ProtectedRoute>
// //               <Admins />
// //             </ProtectedRoute>
// //           }
// //         />
        
// //         {/* Redirect /superadmin to dashboard if authenticated, login if not */}
// //         <Route
// //           path="/"
// //           element={
// //             localStorage.getItem('superadmin_token') ? (
// //               <Navigate to="/superadmin/dashboard" replace />
// //             ) : (
// //               <Navigate to="/superadmin/login" replace />
// //             )
// //           }
// //         />
// //       </Routes>
// //     </SuperAdminAuthProvider>
// //   );
// // }
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { SuperAdminAuthProvider } from './context/SuperAdminAuthContext';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Organizations from './pages/Organizations';
// import OrgDetails from './pages/OrgDetails';
// import Admins from './pages/Admins';

// function ProtectedRoute({ children }) {
//   const token = localStorage.getItem('superadmin_token');
//   if (!token) {
//     return <Navigate to="/superadmin/login" replace />;
//   }
//   return children;
// }

// export default function SuperAdminRouter() {
//   return (
//     <SuperAdminAuthProvider>
//       <Routes>
//         {/* Login Page */}
//         <Route path="/login" element={<Login />} />

//         {/* Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Organizations */}
//         <Route
//           path="/organizations"
//           element={
//             <ProtectedRoute>
//               <Organizations />
//             </ProtectedRoute>
//           }
//         />

//         {/* Organization Details */}
//         <Route
//           path="/organizations/:id"
//           element={
//             <ProtectedRoute>
//               <OrgDetails />
//             </ProtectedRoute>
//           }
//         />

//         {/* Admins */}
//         <Route
//           path="/admins"
//           element={
//             <ProtectedRoute>
//               <Admins />
//             </ProtectedRoute>
//           }
//         />

//         {/* Redirect to Login or Dashboard */}
//         <Route
//           path="/"
//           element={
//             localStorage.getItem('superadmin_token') ? (
//               <Navigate to="/superadmin/dashboard" replace />
//             ) : (
//               <Navigate to="/superadmin/login" replace />
//             )
//           }
//         />
//       </Routes>
//     </SuperAdminAuthProvider>
//   );
// }
// src/roles/superadmin/router.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { SuperAdminAuthProvider } from './context/SuperAdminAuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import OrgDetails from './pages/OrgDetails';
import Admins from './pages/Admins';
import CreateOrgModal from './components/CreateOrgModal';
import CreateAdminModal from './components/CreateAdminModal';

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
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Organizations */}
        <Route
          path="/organizations"
          element={
            <ProtectedRoute>
              <Organizations />
            </ProtectedRoute>
          }
        />

        {/* Organization Details */}
        <Route
          path="/organizations/:id"
          element={
            <ProtectedRoute>
              <OrgDetails />
            </ProtectedRoute>
          }
        />

        {/* Admins */}
        <Route
          path="/admins"
          element={
            <ProtectedRoute>
              <Admins />
            </ProtectedRoute>
          }
        />

        {/* Create Organization */}
        <Route
          path="/create-org"
          element={
            <ProtectedRoute>
              <CreateOrgModal isOpen={true} onClose={() => {}} onSubmit={() => {}} />
            </ProtectedRoute>
          }
        />

        {/* Create Admin */}
        <Route
          path="/create-admin"
          element={
            <ProtectedRoute>
              <CreateAdminModal isOpen={true} onClose={() => {}} onSubmit={() => {}} />
            </ProtectedRoute>
          }
        />

        {/* Redirect to Login or Dashboard */}
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