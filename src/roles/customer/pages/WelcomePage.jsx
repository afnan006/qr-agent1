import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useOTPVerify } from '../hooks/useOTPVerify';
import { ChefHat, MessageSquare, Phone, User } from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { sendOTP, verifyOTP, createGroup } = useUser();
  const otpVerify = useOTPVerify();
  
  const [step, setStep] = useState('welcome'); // welcome, verification, party-size, qr-code
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [partySize, setPartySize] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitUserInfo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Send OTP (mock)
      await sendOTP(formData.phone);
      setStep('verification');
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVerifyOTP = async () => {
    setIsLoading(true);
    
    try {
      const otpValue = otpVerify.getOtpValue();
      const result = await verifyOTP(otpValue, formData.phone);
      
      if (result.success) {
        setStep('party-size');
      } else {
        otpVerify.setError(result.error || 'Verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      otpVerify.setError('Verification failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectPartySize = (size) => {
    setPartySize(size);
    
    // Create the group
    const tableId = sessionStorage.getItem('table_id') || 'table_default';
    createGroup(tableId, formData.name, formData.phone, size);
    
    setStep('qr-code');
  };
  
  const handleFinish = () => {
    navigate('/order-mode');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.4 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {step === 'welcome' && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-md card glow-ring bg-[#EEF1F4]"
        >
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <ChefHat size={64} className="text-[#4C4C9D]" />
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-2xl font-bold text-center mb-6"
          >
            Welcome to Our Restaurant
          </motion.h1>
          
          <motion.form 
            variants={containerVariants}
            onSubmit={handleSubmitUserInfo}
          >
            <motion.div 
              variants={itemVariants}
              className="mb-4"
            >
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-[#1A1A1A] mb-1"
              >
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7A7F87]" size={18} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Afnan Ahmed"
                  required
                  className="input-field pl-10"
                />
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mb-6"
            >
              <label 
                htmlFor="phone" 
                className="block text-sm font-medium text-[#1A1A1A] mb-1"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7A7F87]" size={18} />
                <input
                  type="mobile-phone"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 8296635241"
                  required
                  className="input-field pl-10"
                />
              </div>
            </motion.div>
            
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              Continue
            </motion.button>
          </motion.form>
        </motion.div>
      )}
      
      {step === 'verification' && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-md card glow-ring bg-[#EEF1F4]"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-2xl font-bold text-center mb-4"
          >
            Verify Your Number
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-center text-[#7A7F87] mb-8"
          >
            We've sent a 4-digit code to {formData.phone}
          </motion.p>
          
          <motion.div 
            variants={containerVariants}
            className="flex gap-3 justify-center mb-8"
          >
            {[0, 1, 2, 3].map((index) => (
              <motion.input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={otpVerify.otp[index]}
                onChange={(e) => otpVerify.handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => otpVerify.handleKeyDown(index, e)}
                className="w-14 h-16 text-center text-2xl font-mono border rounded-lg focus:border-[#4C4C9D] focus:ring focus:outline-none"
                variants={itemVariants}
                whileFocus={{ scale: 1.05, borderColor: '#4C4C9D' }}
              />
            ))}
          </motion.div>
          
          {otpVerify.error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-center mb-4"
            >
              {otpVerify.error}
            </motion.p>
          )}
          
          <motion.div variants={containerVariants} className="flex flex-col gap-3">
            <motion.button
              variants={itemVariants}
              onClick={handleVerifyOTP}
              disabled={!otpVerify.isComplete || isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : null}
              Verify Code
            </motion.button>
            
            <motion.button
              variants={itemVariants}
              onClick={() => setStep('welcome')}
              className="btn-secondary w-full"
            >
              Go Back
            </motion.button>
          </motion.div>
        </motion.div>
      )}
      
      {step === 'party-size' && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-md card glow-ring bg-[#EEF1F4]"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-2xl font-bold text-center mb-4"
          >
            How many hungry legends at your table?
          </motion.h1>
          
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-3 gap-4 mb-6"
          >
            {[2, 3, 4, 5, 6, '6+'].map((size) => (
              <motion.button
                key={size}
                onClick={() => handleSelectPartySize(size)}
                className={`py-4 px-2 rounded-full text-lg font-medium transition-all ${
                  partySize === size
                    ? 'bg-[#4C4C9D] text-white'
                    : 'bg-[#EEF1F4] text-[#7A7F87] hover:bg-gray-200'
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {size}
              </motion.button>
            ))}
          </motion.div>
          
          <motion.button
            variants={itemVariants}
            onClick={() => setStep('verification')}
            className="btn-secondary w-full"
          >
            Go Back
          </motion.button>
        </motion.div>
      )}
      
      {step === 'qr-code' && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-md card glow-ring bg-[#EEF1F4]"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-2xl font-bold text-center mb-4"
          >
            Share with Your Table
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <div className="bg-white p-4 rounded-lg shadow-md border-4 border-[#4C4C9D]">
              {/* This would be a real QR code in production */}
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                <MessageSquare size={64} className="text-[#4C4C9D]" />
              </div>
            </div>
          </motion.div>
          
          <motion.p
            variants={itemVariants}
            className="text-center text-[#7A7F87] mb-8"
          >
            📱 Share this QR with your squad so they can join your table.
          </motion.p>
          
          <motion.button
            variants={itemVariants}
            onClick={handleFinish}
            className="btn-primary w-full"
          >
            Continue to Chat
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default WelcomePage;