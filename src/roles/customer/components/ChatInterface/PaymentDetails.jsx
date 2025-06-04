// import React from 'react';
// import { motion } from 'framer-motion';

// const PaymentDetails = ({ total, onPay }) => {
//   const tax = total * 0.1;
//   const grandTotal = total + tax;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="w-full p-4 bg-white rounded-lg shadow-md"
//     >
//       <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
//       <div className="space-y-2">
//         <p className="text-sm">
//           Subtotal: <span className="font-bold">₹{total.toFixed(2)}</span>
//         </p>
//         <p className="text-sm">
//           Tax (10%): <span className="font-bold">₹{tax.toFixed(2)}</span>
//         </p>
//         <p className="text-lg font-bold">
//           Total: ₹{grandTotal.toFixed(2)}
//         </p>
//       </div>
//       <button
//         onClick={onPay}
//         className="mt-4 w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//       >
//         Pay Now
//       </button>
//     </motion.div>
//   );
// };

// export default PaymentDetails;

import React from 'react';
import { motion } from 'framer-motion';

const PaymentDetails = ({ total = 0, onPay }) => {
  const taxRate = 0.1;
  const tax = total * taxRate;
  const grandTotal = total + tax;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full p-5 bg-[#faf9ff] border border-[#e0d3fb] rounded-xl shadow-inner"
    >
      <h3 className="text-lg font-bold text-[#4d2c91] mb-4">Payment Details</h3>

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">₹{total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span className="font-semibold">₹{tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-dashed border-gray-300 pt-3 flex justify-between text-base font-bold text-[#2e1a52]">
          <span>Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onPay}
        className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-[#7e5bef] to-[#a389f4] text-white font-semibold hover:brightness-110 transition duration-200"
      >
        Pay Now
      </button>
    </motion.div>
  );
};

export default PaymentDetails;
