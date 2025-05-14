// // // // // // src/roles/orgadmin/pages/Dashboard.jsx
// // // // // import React from 'react';
// // // // // import { motion } from 'framer-motion';

// // // // // const Dashboard = () => {
// // // // //   return (
// // // // //     <motion.div
// // // // //       initial={{ opacity: 0 }}
// // // // //       animate={{ opacity: 1 }}
// // // // //       exit={{ opacity: 0 }}
// // // // //       className="p-6 bg-[#F5F7FA] min-h-screen"
// // // // //     >
// // // // //       <h1 className="text-2xl font-bold text-[#008080] mb-6">OrgAdmin Dashboard</h1>
// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //         <div className="bg-white p-6 rounded-lg shadow-md">
// // // // //           <h3 className="text-lg font-semibold text-[#008080] mb-2">Menu Items</h3>
// // // // //           <p className="text-gray-600">Total: 15</p>
// // // // //         </div>
// // // // //         <div className="bg-white p-6 rounded-lg shadow-md">
// // // // //           <h3 className="text-lg font-semibold text-[#008080] mb-2">Tables</h3>
// // // // //           <p className="text-gray-600">Total: 10</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     </motion.div>
// // // // //   );
// // // // // };

// // // // // export default Dashboard;
// // // // // src/roles/orgadmin/pages/Dashboard.jsx
// // // // import React, { useEffect, useState } from 'react';
// // // // import { motion } from 'framer-motion';
// // // // import { orgadminApi } from '../api/orgadminApi';

// // // // const Dashboard = () => {
// // // //   const [menuItemCount, setMenuItemCount] = useState(0);
// // // //   const [tableCount, setTableCount] = useState(0);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState('');

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const menuItems = await orgadminApi.getMenuItems();
// // // //         const tables = await orgadminApi.getTables();

// // // //         setMenuItemCount(menuItems.length);
// // // //         setTableCount(tables.length);
// // // //         setLoading(false);
// // // //       } catch (err) {
// // // //         console.error('Error fetching dashboard data:', err);
// // // //         setError(err.message || 'Failed to load dashboard data.');
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, []);

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
// // // //         <p className="text-gray-600">Loading...</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
// // // //         <p className="text-red-500">{error}</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <motion.div
// // // //       initial={{ opacity: 0 }}
// // // //       animate={{ opacity: 1 }}
// // // //       exit={{ opacity: 0 }}
// // // //       className="p-6 bg-[#F5F7FA] min-h-screen"
// // // //     >
// // // //       <h1 className="text-2xl font-bold text-[#008080] mb-6">OrgAdmin Dashboard</h1>
// // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //         {/* Menu Items Card */}
// // // //         <div className="bg-white p-6 rounded-lg shadow-md">
// // // //           <h3 className="text-lg font-semibold text-[#008080] mb-2">Menu Items</h3>
// // // //           <p className="text-gray-600">Total: {menuItemCount}</p>
// // // //         </div>

// // // //         {/* Tables Card */}
// // // //         <div className="bg-white p-6 rounded-lg shadow-md">
// // // //           <h3 className="text-lg font-semibold text-[#008080] mb-2">Tables</h3>
// // // //           <p className="text-gray-600">Total: {tableCount}</p>
// // // //         </div>
// // // //       </div>
// // // //     </motion.div>
// // // //   );
// // // // };

// // // // export default Dashboard;
// // // import React, { useEffect, useState } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { orgadminApi } from '../api/orgadminApi';

// // // const Dashboard = () => {
// // //   const [menuItemCount, setMenuItemCount] = useState(0);
// // //   const [tableCount, setTableCount] = useState(0);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const orgId = localStorage.getItem('org_id'); // Get org_id from localStorage
// // //         if (!orgId) {
// // //           throw new Error('No org ID found in localStorage');
// // //         }

// // //         const menuItems = await orgadminApi.getMenuItems(orgId); // Pass orgId
// // //         const tables = await orgadminApi.getTables(orgId); // Pass orgId

// // //         setMenuItemCount(menuItems.length);
// // //         setTableCount(tables.length);
// // //         setLoading(false);
// // //       } catch (err) {
// // //         console.error('Error fetching dashboard data:', err);
// // //         setError(err.message || 'Failed to load dashboard data.');
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
// // //         <p className="text-gray-600">Loading...</p>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
// // //         <p className="text-red-500">{error}</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0 }}
// // //       animate={{ opacity: 1 }}
// // //       exit={{ opacity: 0 }}
// // //       className="p-6 bg-[#F5F7FA] min-h-screen"
// // //     >
// // //       <h1 className="text-2xl font-bold text-[#008080] mb-6">OrgAdmin Dashboard</h1>
// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //         {/* Menu Items Card */}
// // //         <div className="bg-white p-6 rounded-lg shadow-md">
// // //           <h3 className="text-lg font-semibold text-[#008080] mb-2">Menu Items</h3>
// // //           <p className="text-gray-600">Total: {menuItemCount}</p>
// // //         </div>

// // //         {/* Tables Card */}
// // //         <div className="bg-white p-6 rounded-lg shadow-md">
// // //           <h3 className="text-lg font-semibold text-[#008080] mb-2">Tables</h3>
// // //           <p className="text-gray-600">Total: {tableCount}</p>
// // //         </div>
// // //       </div>
// // //     </motion.div>
// // //   );
// // // };

// // // export default Dashboard;

// // import React, { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { orgadminApi } from '../api/orgadminApi';

// // const Dashboard = () => {
// //   const [menuItemCount, setMenuItemCount] = useState(0);
// //   const [tableCount, setTableCount] = useState(0);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // Fetch menu items and tables using the token (no need for org_id)
// //         const menuItems = await orgadminApi.getMenuItems();
// //         const tables = await orgadminApi.getTables();

// //         // Update state with fetched data
// //         setMenuItemCount(menuItems.length);
// //         setTableCount(tables.length);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error('❌ Error fetching dashboard data:', err.message);
// //         setError(err.message || 'Failed to load dashboard data.');
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
// //         <p className="text-gray-600">Loading...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
// //         <p className="text-red-500">{error}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="p-6 bg-[#F5F7FA] min-h-screen"
// //     >
// //       <h1 className="text-2xl font-bold text-[#008080] mb-6">OrgAdmin Dashboard</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {/* Menu Items Card */}
// //         <div className="bg-white p-6 rounded-lg shadow-md">
// //           <h3 className="text-lg font-semibold text-[#008080] mb-2">Menu Items</h3>
// //           <p className="text-gray-600">Total: {menuItemCount}</p>
// //         </div>

// //         {/* Tables Card */}
// //         <div className="bg-white p-6 rounded-lg shadow-md">
// //           <h3 className="text-lg font-semibold text-[#008080] mb-2">Tables</h3>
// //           <p className="text-gray-600">Total: {tableCount}</p>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { orgadminApi } from '../api/orgadminApi';

// const Dashboard = () => {
//   const [menuItemCount, setMenuItemCount] = useState(0);
//   const [tableCount, setTableCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log('📊 Fetching dashboard data...');
//         const menuItems = await orgadminApi.getMenuItems();
//         const tables = await orgadminApi.getTables();

//         console.log('📊 Menu items fetched:', menuItems);
//         console.log('📊 Tables fetched:', tables);

//         setMenuItemCount(menuItems.length);
//         setTableCount(tables.length);
//         setLoading(false);
//       } catch (err) {
//         console.error('❌ Error fetching dashboard data:', err.message);
//         setError(err.message || 'Failed to load dashboard data.');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
//         <p className="text-gray-600">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="p-6 bg-[#F5F7FA] min-h-screen"
//     >
//       <h1 className="text-2xl font-bold text-[#008080] mb-6">OrgAdmin Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Menu Items Card */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold text-[#008080] mb-2">Menu Items</h3>
//           <p className="text-gray-600">Total: {menuItemCount}</p>
//         </div>

//         {/* Tables Card */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold text-[#008080] mb-2">Tables</h3>
//           <p className="text-gray-600">Total: {tableCount}</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Dashboard;

// pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-8 min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">🚀 Org Admin Dashboard</h1>
        <p className="mb-6 text-gray-600">
          Welcome, commander of chaos. Use the buttons below to rule over Menu Items and Tables.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/orgadmin/menu-items"
            className="block bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white text-center py-6 rounded-lg shadow-md transition-all duration-200"
          >
            🍔 Manage Menu Items
            <p className="text-sm mt-2 text-purple-200">Add, delete, bulk import menu items</p>
          </Link>

          <Link
            to="/orgadmin/tables"
            className="block bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-center py-6 rounded-lg shadow-md transition-all duration-200"
          >
            🍽️ Manage Tables
            <p className="text-sm mt-2 text-green-200">Add/delete/bulk create tables</p>
          </Link>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          Pro tip: Don’t mess it up. The API is watching. 👀
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
