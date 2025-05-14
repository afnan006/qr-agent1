import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { superadminApi } from '../api/superadminApi';
import { useNavigate } from 'react-router-dom';

function CreateOrgModal({ isOpen, onClose }) {
  const navigate = useNavigate(); // For navigation
  const [formData, setFormData] = useState({
    name: '',
    admin_email: '',
    admin_password: '',
    location: '', // Added location field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await superadminApi.createOrganization(formData);
      setSuccessMessage('Organization created successfully!');
      setTimeout(() => {
        onClose(); // Close the modal after a short delay
        navigate('/superadmin/dashboard'); // Navigate back to the dashboard
      }, 1500); // Keep the success message visible for 1.5 seconds
    } catch (err) {
      setError(err.message || 'Failed to create organization.');
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
                <h2 className="text-xl font-semibold">Create Organization</h2>
                <button
                  onClick={() => {
                    onClose(); // Close the modal
                    navigate('/superadmin/dashboard'); // Navigate back to the dashboard
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  {/* Admin Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      value={formData.admin_email}
                      onChange={(e) =>
                        setFormData({ ...formData, admin_email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  {/* Admin Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Password
                    </label>
                    <input
                      type="password"
                      value={formData.admin_password}
                      onChange={(e) =>
                        setFormData({ ...formData, admin_password: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  {/* Location Field (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
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
                    {loading ? 'Creating...' : 'Create Organization'}
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

export default CreateOrgModal;