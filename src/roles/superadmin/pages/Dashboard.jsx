// src/roles/superadmin/pages/Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data for dashboard metrics
  const dashboardData = {
    organizations: 10,
    admins: 5,
    activeOrganizations: 8,
    pendingOrganizations: 2,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-[#F5F7FA] min-h-screen"
    >
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#1A365D] mb-6">SuperAdmin Dashboard</h1>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Organizations Card */}
        <div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => navigate('/superadmin/organizations')}
        >
          <h3 className="text-lg font-semibold text-[#1A365D] mb-2">Organizations</h3>
          <p className="text-gray-600">Total: {dashboardData.organizations}</p>
        </div>

        {/* Admins Card */}
        <div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => navigate('/superadmin/admins')}
        >
          <h3 className="text-lg font-semibold text-[#1A365D] mb-2">Admins</h3>
          <p className="text-gray-600">Total: {dashboardData.admins}</p>
        </div>

        {/* Active Organizations Card */}
        <div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => navigate('/superadmin/organizations')}
        >
          <h3 className="text-lg font-semibold text-[#1A365D] mb-2">Active Organizations</h3>
          <p className="text-gray-600">{dashboardData.activeOrganizations}</p>
        </div>

        {/* Pending Organizations Card */}
        <div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => navigate('/superadmin/organizations')}
        >
          <h3 className="text-lg font-semibold text-[#1A365D] mb-2">Pending Organizations</h3>
          <p className="text-gray-600">{dashboardData.pendingOrganizations}</p>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-[#1A365D] mb-4">Quick Actions</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Create Organization Button */}
          <button
            className="flex items-center justify-center w-full md:w-auto py-2 px-4 bg-[#1A365D] text-white rounded-md hover:bg-[#122b4a] transition-colors"
            onClick={() => navigate('/superadmin/create-org')}
          >
            Create Organization
          </button>

          {/* Create Admin Button */}
          <button
            className="flex items-center justify-center w-full md:w-auto py-2 px-4 bg-[#1A365D] text-white rounded-md hover:bg-[#122b4a] transition-colors"
            onClick={() => navigate('/superadmin/create-admin')}
          >
            Create Admin
          </button>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#1A365D] mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li className="text-gray-600">Organization "Restaurant A" approved.</li>
          <li className="text-gray-600">New admin "John Doe" created.</li>
          <li className="text-gray-600">Organization "Food Court B" pending approval.</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Dashboard;