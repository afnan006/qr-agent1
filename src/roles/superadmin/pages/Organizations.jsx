// // // // src/roles/superadmin/pages/Organizations.jsx
// // // import React from 'react';
// // // import { motion } from 'framer-motion';
// // // import OrgTable from '../components/OrgTable';

// // // const Organizations = () => {
// // //   const mockOrganizations = [
// // //     { id: 1, name: 'Restaurant Chain A', status: 'active', locations: 25 },
// // //     { id: 2, name: 'Food Court B', status: 'active', locations: 12 },
// // //   ];

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0 }}
// // //       animate={{ opacity: 1 }}
// // //       exit={{ opacity: 0 }}
// // //       className="p-6 bg-[#F5F7FA] min-h-screen"
// // //     >
// // //       <h1 className="text-2xl font-bold text-[#1A365D] mb-6">Organizations</h1>
// // //       <OrgTable organizations={mockOrganizations} onEdit={() => {}} onDelete={() => {}} />
// // //     </motion.div>
// // //   );
// // // };

// // // export default Organizations;
// // import React, { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import OrgTable from '../components/OrgTable';
// // import { superadminApi } from '../api/superadminApi';

// // const Organizations = () => {
// //   const [organizations, setOrganizations] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const fetchOrganizations = async () => {
// //       try {
// //         const orgs = await superadminApi.listOrganizations();
// //         setOrganizations(orgs);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchOrganizations();
// //   }, []);

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="p-6 bg-[#F5F7FA] min-h-screen"
// //     >
// //       <h1 className="text-2xl font-bold text-[#1A365D] mb-6">Organizations</h1>
// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : error ? (
// //         <p className="text-red-500">{error}</p>
// //       ) : (
// //         <OrgTable organizations={organizations} onEdit={() => {}} onDelete={() => {}} />
// //       )}
// //     </motion.div>
// //   );
// // };

// // export default Organizations;
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import OrgTable from '../components/OrgTable';
// import { superadminApi } from '../api/superadminApi';
// import LoadingSpinner from "../../../shared/utils/LoadingSpinner";
// const Organizations = () => {
//   const [organizations, setOrganizations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch organizations from the API
//   useEffect(() => {
//     const fetchOrganizations = async () => {
//       try {
//         const orgs = await superadminApi.listOrganizations();
//         setOrganizations(orgs);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch organizations.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrganizations();
//   }, []);

//   // Handle organization edit
//   const handleEdit = (org) => {
//     console.log('Editing organization:', org);
//     // Add logic to navigate to an edit page or open a modal
//   };

//   // Handle organization deletion
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this organization?')) return;

//     try {
//       await superadminApi.deleteOrganization(id); // Assuming this method exists in your API
//       setOrganizations((prevOrgs) => prevOrgs.filter((org) => org.id !== id));
//     } catch (err) {
//       setError(err.message || 'Failed to delete organization.');
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="p-6 bg-[#F5F7FA] min-h-screen"
//     >
//       {/* Header */}
//       <h1 className="text-2xl font-bold text-[#1A365D] mb-6">Organizations</h1>

//       {/* Loading State */}
//       {loading && (
//         <div className="flex items-center justify-center h-64">
//           <LoadingSpinner />
//         </div>
//       )}

//       {/* Error State */}
//       {error && <p className="text-red-500 text-center">{error}</p>}

//       {/* Organization Table */}
//       {!loading && !error && (
//         <OrgTable
//           organizations={organizations}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       )}
//     </motion.div>
//   );
// };

// export default Organizations;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import OrgTable from '../components/OrgTable';
import { superadminApi } from '../api/superadminApi';
import LoadingSpinner from '../../../shared/utils/LoadingSpinner';

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch organizations from the API
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        console.log('Fetching organizations...');
        const orgs = await superadminApi.listOrganizations();
        console.log('Fetched organizations:', orgs);
        setOrganizations(orgs);
      } catch (err) {
        console.error('Error fetching organizations:', err);
        setError(err.message || 'Failed to fetch organizations.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  // Handle organization edit
  const handleEdit = (org) => {
    console.log('Editing organization:', org);
    // Add logic to navigate to an edit page or open a modal
  };

  // Handle organization deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this organization?')) return;

    try {
      console.log('Deleting organization with ID:', id);
      await superadminApi.deleteOrganization(id); // Assuming this method exists in your API
      setOrganizations((prevOrgs) => prevOrgs.filter((org) => org.id !== id));
      console.log('Organization deleted successfully.');
    } catch (err) {
      console.error('Error deleting organization:', err);
      setError(err.message || 'Failed to delete organization.');
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
      <h1 className="text-2xl font-bold text-[#1A365D] mb-6">Organizations</h1>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner />
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Organization Table */}
      {!loading && !error && (
        <OrgTable
          organizations={organizations}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </motion.div>
  );
};

export default Organizations;