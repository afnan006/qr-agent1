// // src/roles/superadmin/pages/Dashboard.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   // Mock data for dashboard metrics
//   const dashboardData = {
//     organizations: 10,
//     admins: 5,
//     activeOrganizations: 8,
//     pendingOrganizations: 2,
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="p-6 bg-[#F5F7FA] min-h-screen"
//     >
//       {/* Header */}
//       <h1 className="text-2xl font-bold text-[#1A365D] mb-6">SuperAdmin Dashboard</h1>

//       {/* Key Metrics Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {/* Organizations Card */}
//         <div
//           className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
//           onClick={() => navigate('/superadmin/organizations')}
//         >
//           <h3 className="text-lg font-semibold text-[#1A365D] mb-2">Organizations</h3>
//           <p className="text-gray-600">Total: {dashboardData.organizations}</p>
//         </div>

//         {/* Admins Card */}
//         <div
//           className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
//           onClick={() => navigate('/superadmin/admins')}
//         >
//           <h3 className="text-lg font-semibold text-[#1A365D] mb-2">Admins</h3>
//           <p className="text-gray-600">Total: {dashboardData.admins}</p>
//         </div>

//         {/* Active Organizations Card */}
//         <div
//           className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
//           onClick={() => navigate('/superadmin/organizations')}
//         >
//           <h3 className="text-lg font-semibold text-[#1A365D] mb-2">Active Organizations</h3>
//           <p className="text-gray-600">{dashboardData.activeOrganizations}</p>
//         </div>

//         {/* Pending Organizations Card */}
//         <div
//           className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
//           onClick={() => navigate('/superadmin/organizations')}
//         >
//           <h3 className="text-lg font-semibold text-[#1A365D] mb-2">Pending Organizations</h3>
//           <p className="text-gray-600">{dashboardData.pendingOrganizations}</p>
//         </div>
//       </div>

//       {/* Quick Actions Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold text-[#1A365D] mb-4">Quick Actions</h2>
//         <div className="flex flex-col md:flex-row gap-4">
//           {/* Create Organization Button */}
//           <button
//             className="flex items-center justify-center w-full md:w-auto py-2 px-4 bg-[#1A365D] text-white rounded-md hover:bg-[#122b4a] transition-colors"
//             onClick={() => navigate('/superadmin/create-org')}
//           >
//             Create Organization
//           </button>

//           {/* Create Admin Button */}
//           <button
//             className="flex items-center justify-center w-full md:w-auto py-2 px-4 bg-[#1A365D] text-white rounded-md hover:bg-[#122b4a] transition-colors"
//             onClick={() => navigate('/superadmin/create-admin')}
//           >
//             Create Admin
//           </button>
//         </div>
//       </div>

//       {/* Recent Activity Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold text-[#1A365D] mb-4">Recent Activity</h2>
//         <ul className="space-y-2">
//           <li className="text-gray-600">Organization "Restaurant A" approved.</li>
//           <li className="text-gray-600">New admin "John Doe" created.</li>
//           <li className="text-gray-600">Organization "Food Court B" pending approval.</li>
//         </ul>
//       </div>
//     </motion.div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  // Hardcoded mock data for the dashboard
  const [dashboardData] = useState({
    organizations: 10,
    admins: 5,
    activeOrganizations: 8,
    pendingOrganizations: 2,
    recentActivity: [
      'Organization "Restaurant A" approved.',
      'New admin "John Doe" created.',
      'Organization "Food Court B" pending approval.',
    ],
  });

  // Chart Data
  const chartData = {
    labels: ['Organizations', 'Admins', 'Active Orgs', 'Pending Orgs'],
    datasets: [
      {
        label: 'Metrics',
        data: [
          dashboardData.organizations,
          dashboardData.admins,
          dashboardData.activeOrganizations,
          dashboardData.pendingOrganizations,
        ],
        backgroundColor: ['#1A365D', '#4C4C9D', '#8B5CF6', '#F43F5E'],
        borderColor: ['#122b4a', '#3730A3', '#6D28D9', '#E11D48'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#e2e8f0',
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-[#F5F7FA] min-h-screen"
    >
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#1A365D] mb-6 text-center md:text-left">
        SuperAdmin Dashboard
      </h1>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Organizations Card */}
        <Card
          title="Organizations"
          value={dashboardData.organizations}
          onClick={() => navigate('/superadmin/organizations')}
        />

        {/* Admins Card */}
        <Card
          title="Admins"
          value={dashboardData.admins}
          onClick={() => navigate('/superadmin/admins')}
        />

        {/* Active Organizations Card */}
        <Card
          title="Active Organizations"
          value={dashboardData.activeOrganizations}
          onClick={() => navigate('/superadmin/organizations')}
        />

        {/* Pending Organizations Card */}
        <Card
          title="Pending Organizations"
          value={dashboardData.pendingOrganizations}
          onClick={() => navigate('/superadmin/organizations')}
        />
      </div>

      {/* Charts Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-[#1A365D] mb-4">Metrics Overview</h2>
        <div className="h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-[#1A365D] mb-4">Quick Actions</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Create Organization Button */}
          <ActionButton
            label="Create Organization"
            onClick={() => navigate('/superadmin/create-org')}
          />

          {/* Create Admin Button */}
          <ActionButton
            label="Create Admin"
            onClick={() => navigate('/superadmin/create-admin')}
          />
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#1A365D] mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          {dashboardData.recentActivity.map((activity, index) => (
            <li key={index} className="text-gray-600">
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// Reusable Card Component
const Card = ({ title, value, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-[#1A365D] mb-2">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </motion.div>
  );
};

// Reusable Action Button Component
const ActionButton = ({ label, onClick }) => {
  return (
    <button
      className="flex items-center justify-center w-full md:w-auto py-2 px-4 bg-[#1A365D] text-white rounded-md hover:bg-[#122b4a] transition-colors"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Dashboard;