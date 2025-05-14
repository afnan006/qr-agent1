// // import React, { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { X } from 'lucide-react';

// // function CreateAdminModal({ isOpen, onClose, onSubmit }) {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     role: 'org_admin',
// //   });

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onSubmit(formData);
// //     setFormData({ name: '', email: '', role: 'org_admin' });
// //     onClose();
// //   };

// //   return (
// //     <AnimatePresence>
// //       {isOpen && (
// //         <>
// //           <motion.div
// //             className="fixed inset-0 bg-black bg-opacity-50 z-40"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             onClick={onClose}
// //           />
          
// //           <motion.div
// //             className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl z-50"
// //             initial={{ x: '100%' }}
// //             animate={{ x: 0 }}
// //             exit={{ x: '100%' }}
// //             transition={{ type: 'tween', duration: 0.3 }}
// //           >
// //             <div className="flex flex-col h-full">
// //               <div className="flex items-center justify-between p-6 border-b">
// //                 <h2 className="text-xl font-display font-semibold">Create Admin</h2>
// //                 <button
// //                   onClick={onClose}
// //                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
// //                 >
// //                   <X size={20} />
// //                 </button>
// //               </div>

// //               <form onSubmit={handleSubmit} className="flex-1 p-6">
// //                 <div className="space-y-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Name
// //                     </label>
// //                     <input
// //                       type="text"
// //                       value={formData.name}
// //                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sa-primary focus:border-sa-primary"
// //                       required
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       value={formData.email}
// //                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sa-primary focus:border-sa-primary"
// //                       required
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Role
// //                     </label>
// //                     <select
// //                       value={formData.role}
// //                       onChange={(e) => setFormData({ ...formData, role: e.target.value })}
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sa-primary focus:border-sa-primary"
// //                     >
// //                       <option value="org_admin">Organization Admin</option>
// //                       <option value="kitchen_admin">Kitchen Admin</option>
// //                     </select>
// //                   </div>
// //                 </div>

// //                 <div className="mt-6">
// //                   <button
// //                     type="submit"
// //                     className="w-full bg-sa-primary text-white py-2 px-4 rounded-md hover:bg-sa-primary-dark transition-colors"
// //                   >
// //                     Create Admin
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </motion.div>
// //         </>
// //       )}
// //     </AnimatePresence>
// //   );
// // }

// // export default CreateAdminModal;

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, CheckCircle } from 'lucide-react';

// function CreateAdminModal({ isOpen, onClose, onSubmit }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     role: 'org_admin',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       await onSubmit(formData); // Call the onSubmit function passed as a prop
//       setSuccessMessage('Admin created successfully!');
//       setTimeout(() => {
//         onClose(); // Close the modal after a short delay
//       }, 1500); // Keep the success message visible for 1.5 seconds
//     } catch (err) {
//       setError(err.message || 'Failed to create admin.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Background Overlay */}
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-50 z-40"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose} // Closes the modal when clicking outside
//           />
          
//           {/* Modal Content */}
//           <motion.div
//             className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl z-50"
//             initial={{ x: '100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '100%' }}
//             transition={{ type: 'tween', duration: 0.3 }}
//           >
//             <div className="flex flex-col h-full">
//               {/* Header */}
//               <div className="flex items-center justify-between p-6 border-b">
//                 <h2 className="text-xl font-semibold">Create Admin</h2>
//                 <button
//                   onClick={() => {
//                     onClose(); // Close the modal
//                     setFormData({ name: '', email: '', role: 'org_admin' }); // Reset form data
//                   }}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="flex-1 p-6">
//                 <div className="space-y-4">
//                   {/* Name Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sa-primary focus:border-sa-primary"
//                       required
//                     />
//                   </div>

//                   {/* Email Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sa-primary focus:border-sa-primary"
//                       required
//                     />
//                   </div>

//                   {/* Role Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Role
//                     </label>
//                     <select
//                       value={formData.role}
//                       onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sa-primary focus:border-sa-primary"
//                     >
//                       <option value="org_admin">Organization Admin</option>
//                       <option value="kitchen_admin">Kitchen Admin</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Error Message */}
//                 {error && <p className="text-red-500 mt-2">{error}</p>}

//                 {/* Success Message */}
//                 {successMessage && (
//                   <div className="flex items-center space-x-2 mt-2 text-green-600">
//                     <CheckCircle size={20} />
//                     <p>{successMessage}</p>
//                   </div>
//                 )}

//                 {/* Submit Button */}
//                 <div className="mt-6">
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-[#1A365D] text-white py-2 px-4 rounded-md hover:bg-[#122b4a] transition-colors disabled:bg-gray-400"
//                   >
//                     {loading ? 'Creating...' : 'Create Admin'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// export default CreateAdminModal;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CreateAdminModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'org_admin',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Use navigate hook for redirection
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      console.log('Submitting form data:', formData); // Debugging log
      await onSubmit(formData); // Call the onSubmit function passed as a prop
      setSuccessMessage('Admin created successfully!');
      setTimeout(() => {
        onClose(); // Close the modal after a short delay
        navigate('/superadmin/admins'); // Navigate to the admins page
      }, 1500); // Keep the success message visible for 1.5 seconds
    } catch (err) {
      console.error('Error during admin creation:', err); // Debugging log
      setError(err.message || 'Failed to create admin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // Closes the modal when clicking outside
          />
          
          {/* Modal Content */}
          <motion.div
            className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl z-50"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">Create Admin</h2>
                <button
                  onClick={() => {
                    onClose(); // Close the modal
                    navigate('/superadmin/dashboard'); // Navigate to the dashboard
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 p-6">
                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sa-primary focus:border-sa-primary"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sa-primary focus:border-sa-primary"
                      required
                    />
                  </div>

                  {/* Role Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sa-primary focus:border-sa-primary"
                    >
                      <option value="org_admin">Organization Admin</option>
                      <option value="kitchen_admin">Kitchen Admin</option>
                    </select>
                  </div>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-2">{error}</p>}

                {/* Success Message */}
                {successMessage && (
                  <div className="flex items-center space-x-2 mt-2 text-green-600">
                    <CheckCircle size={20} />
                    <p>{successMessage}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1A365D] text-white py-2 px-4 rounded-md hover:bg-[#122b4a] transition-colors disabled:bg-gray-400"
                  >
                    {loading ? 'Creating...' : 'Create Admin'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CreateAdminModal;