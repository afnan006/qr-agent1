// // src/roles/superadmin/pages/Organizations.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import OrgTable from '../components/OrgTable';

// const Organizations = () => {
//   const mockOrganizations = [
//     { id: 1, name: 'Restaurant Chain A', status: 'active', locations: 25 },
//     { id: 2, name: 'Food Court B', status: 'active', locations: 12 },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="p-6 bg-[#F5F7FA] min-h-screen"
//     >
//       <h1 className="text-2xl font-bold text-[#1A365D] mb-6">Organizations</h1>
//       <OrgTable organizations={mockOrganizations} onEdit={() => {}} onDelete={() => {}} />
//     </motion.div>
//   );
// };

// export default Organizations;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import OrgTable from '../components/OrgTable';
import { superadminApi } from '../api/superadminApi';

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const orgs = await superadminApi.listOrganizations();
        setOrganizations(orgs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-[#F5F7FA] min-h-screen"
    >
      <h1 className="text-2xl font-bold text-[#1A365D] mb-6">Organizations</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <OrgTable organizations={organizations} onEdit={() => {}} onDelete={() => {}} />
      )}
    </motion.div>
  );
};

export default Organizations;