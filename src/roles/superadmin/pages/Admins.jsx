// // src/roles/superadmin/pages/Admins.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import AdminTable from '../components/AdminTable';

// const Admins = () => {
//   const mockAdmins = [
//     { id: 1, name: 'John Doe', email: 'john@example.com', role: 'org_admin', status: 'active' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'kitchen_admin', status: 'active' },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="p-6 bg-[#F5F7FA] min-h-screen"
//     >
//       <h1 className="text-2xl font-bold text-[#1A365D] mb-6">Admins</h1>
//       <AdminTable admins={mockAdmins} onEdit={() => {}} onDelete={() => {}} />
//     </motion.div>
//   );
// };

// export default Admins;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AdminTable from '../components/AdminTable';
import LoadingSpinner from '../../../shared/utils/LoadingSpinner';
import { superadminApi } from '../api/superadminApi';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch admins from the API
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        console.log('Fetching admins...');
        const fetchedAdmins = await superadminApi.listAdmins();
        console.log('Fetched admins:', fetchedAdmins);
        setAdmins(fetchedAdmins);
      } catch (err) {
        console.error('Error fetching admins:', err);
        setError(err.message || 'Failed to fetch admins.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  // Handle admin edit
  const handleEdit = (admin) => {
    console.log('Editing admin:', admin);
    // Add logic to navigate to an edit page or open a modal
  };

  // Handle admin deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;

    try {
      console.log('Deleting admin with ID:', id);
      await superadminApi.deleteAdmin(id); // Assuming this method exists in your API
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
      console.log('Admin deleted successfully.');
    } catch (err) {
      console.error('Error deleting admin:', err);
      setError(err.message || 'Failed to delete admin.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-[#F5F7FA] min-h-screen"
    >
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#1A365D] mb-6">Admins</h1>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Admin Table */}
      {!loading && !error && (
        <AdminTable
          admins={admins}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </motion.div>
  );
};

export default Admins;