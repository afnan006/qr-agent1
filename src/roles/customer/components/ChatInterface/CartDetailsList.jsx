// import React from 'react';
// import { motion } from 'framer-motion';

// const SkeletonLoader = () => (
//   <div className="animate-pulse space-y-4">
//     {[...Array(3)].map((_, i) => (
//       <div key={i} className="flex items-start">
//         <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
//         <div className="ml-4 flex-1 space-y-2">
//           <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//           <div className="h-3 bg-gray-200 rounded w-full"></div>
//           <div className="h-3 bg-gray-200 rounded w-1/4"></div>
//         </div>
//       </div>
//     ))}
//   </div>
// );

// const CartItem = React.memo(({ item }) => (
//   <motion.li
//     initial={{ opacity: 0, y: 10 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.3 }}
//     className="flex items-start py-3 border-b border-gray-100 last:border-0"
//   >
//     <picture className="flex-shrink-0">
//       <source srcSet={item.image} type="image/webp" />
//       <img
//         src={item.image}
//         alt={item.name}
//         loading="lazy"
//         width={64}
//         height={64}
//         className="w-16 h-16 object-cover rounded-lg bg-gray-100"
//         onError={(e) => {
//           e.target.src = '/placeholder-product.png';
//         }}
//       />
//     </picture>
//     <div className="ml-4 overflow-hidden">
//       <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
//       <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
//       <p className="text-sm font-bold mt-1 text-indigo-600">₹{item.price.toLocaleString('en-IN')}</p>
//     </div>
//   </motion.li>
// ));

// const CartDetailsList = ({ items, isLoading }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
//     >
//       <div className="p-4 border-b border-gray-100">
//         <h3 className="text-lg font-semibold text-gray-900">Your Cart</h3>
//       </div>
      
//       <div className="p-4">
//         {isLoading ? (
//           <SkeletonLoader />
//         ) : items.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex flex-col items-center justify-center py-8"
//           >
//             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//               <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
//               </svg>
//             </div>
//             <p className="text-center text-gray-500">Your cart is empty</p>
//           </motion.div>
//         ) : (
//           <ul className="divide-y divide-gray-100">
//             {items.map((item) => (
//               <CartItem key={item.id} item={item} />
//             ))}
//           </ul>
//         )}
//       </div>
      
//       {items.length > 0 && (
//         <div className="p-4 border-t border-gray-100 bg-gray-50">
//           <button className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200">
//             Proceed to Checkout
//           </button>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default React.memo(CartDetailsList);
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = () => (
  <div className="min-w-[260px] h-32 bg-[#f8f6ff] rounded-lg shadow-md p-4 flex space-x-4 animate-pulse border border-[#ded7f3]">
    <div className="w-20 h-20 bg-gray-300 rounded-md skeleton" />
    <div className="flex flex-col justify-between flex-1">
      <div className="w-3/4 h-4 bg-gray-300 rounded skeleton" />
      <div className="w-full h-3 bg-gray-200 rounded skeleton" />
      <div className="w-1/2 h-4 bg-gray-300 rounded skeleton" />
    </div>
  </div>
);

const CartDetailsList = ({ items = [], loading = false, onUpdateQuantity }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="w-full mt-4 p-3 bg-[#fdfcff] border border-[#dcd2fa] rounded-xl shadow-inner"
    >
      <h3 className="text-md font-bold text-[#4d2c91] mb-1 px-1">🛒 Your Cart</h3>

      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
          : items.length === 0 ? (
              <p className="text-gray-500 text-sm">Cart's empty. Add some magic 🌟</p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[260px] bg-white border border-[#e0d4ff] rounded-xl shadow-sm p-3 flex space-x-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md border border-gray-200"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <h4 className="text-sm font-semibold text-[#4b3b78] truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-bold text-[#2d174d]">₹{item.price}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-[#e3dbf9] text-[#4d2c91] text-sm font-bold flex items-center justify-center hover:bg-[#d1c2f3] transition"
                        >−</button>
                        <span className="text-sm text-gray-700">{item.quantity || 1}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-[#e3dbf9] text-[#4d2c91] text-sm font-bold flex items-center justify-center hover:bg-[#d1c2f3] transition"
                        >+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
      </div>
    </motion.div>
  );
};

export default CartDetailsList;
