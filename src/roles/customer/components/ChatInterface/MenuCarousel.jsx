// // import React from 'react';
// // import { motion } from 'framer-motion';

// // const MenuCarousel = ({ items, title }) => {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="w-full p-4 bg-white rounded-lg shadow-md"
// //     >
// //       {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
// //       <div className="flex overflow-x-auto">
// //         {items.map((item) => (
// //           <motion.div
// //             key={item.id}
// //             className="min-w-[200px] flex-shrink-0 p-4 mr-4 bg-gray-100 rounded-lg"
// //             whileHover={{ scale: 1.05 }}
// //           >
// //             <img
// //               src={item.image}
// //               alt={item.name}
// //               className="w-full h-32 object-cover rounded-t-lg"
// //             />
// //             <h4 className="text-sm font-medium mt-2">{item.name}</h4>
// //             <p className="text-xs text-gray-600">{item.description}</p>
// //             <p className="text-sm font-bold mt-1">₹{item.price}</p>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default MenuCarousel;
// import React from 'react';
// import { motion } from 'framer-motion';

// const SkeletonCard = () => (
//   <div className="min-w-[220px] h-60 bg-[#f8f6ff] rounded-xl p-3 shadow-md border border-[#ded7f3] animate-pulse flex-shrink-0 mr-4">
//     <div className="w-full h-32 bg-gray-300 rounded-md skeleton" />
//     <div className="mt-3 space-y-2">
//       <div className="w-3/4 h-4 bg-gray-300 rounded" />
//       <div className="w-full h-3 bg-gray-200 rounded" />
//       <div className="w-1/2 h-4 bg-gray-300 rounded" />
//     </div>
//   </div>
// );

// const MenuCarousel = ({ items = [], title, loading = false }) => {
//   const safeItems = Array.isArray(items) ? items : [];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0 }}
//       transition={{ type: 'spring', stiffness: 100 }}
//       className="w-full p-4 bg-[#fdfcff] border border-[#e0d8ff] rounded-xl shadow-inner"
//     >
//       {title && (
//         <h3 className="text-lg font-bold text-[#4d2c91] mb-1 px-1">{title}</h3>
//       )}

//       <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
//         {loading
//           ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
//           : safeItems.length === 0 ? (
//               <p className="text-sm text-gray-500 px-2">No items to show right now 😶‍🌫️</p>
//             ) : (
//               safeItems.map((item) => (
//                 <motion.div
//                   key={item.id}
//                   className="min-w-[220px] snap-start bg-white border border-[#e6d9ff] rounded-xl shadow-sm p-3 flex-shrink-0 mr-4"
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-32 object-cover rounded-md border border-gray-200"
//                   />
//                   <div className="mt-2 space-y-1">
//                     <h4 className="text-sm font-semibold text-[#3f2d70] truncate">{item.name}</h4>
//                     <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
//                     <p className="text-sm font-bold text-[#2d174d] mt-1">₹{item.price}</p>
//                   </div>
//                 </motion.div>
//               ))
//             )}
//       </div>
//     </motion.div>
//   );
// };

// export default MenuCarousel;
// // 
import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = () => (
  <div className="min-w-[180px] h-48 bg-[#f8f6ff] rounded-xl p-3 shadow-md border border-[#ded7f3] animate-pulse flex-shrink-0 mr-4">
    <div className="w-full h-24 bg-gray-300 rounded-md skeleton" />
    <div className="mt-3 space-y-2">
      <div className="flex justify-between">
        <div className="w-3/5 h-4 bg-gray-300 rounded" />
        <div className="w-1/4 h-4 bg-gray-300 rounded" />
      </div>
      <div className="w-full h-3 bg-gray-200 rounded" />
      <div className="w-full h-8 bg-gray-300 rounded-md skeleton" />
    </div>
  </div>
);

const MenuCarousel = ({ items = [], title, loading = false, onUpdateQuantity }) => {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="w-full p-4 bg-[#fdfcff] border border-[#e0d8ff] rounded-xl shadow-inner"
    >
      {title && (
        <h3 className="text-lg font-bold text-[#4d2c91] mb-3 px-1">{title}</h3>
      )}

      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-1">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : safeItems.length === 0 ? (
              <p className="text-sm text-gray-500 px-2">No items to show right now 😶‍🌫️</p>
            ) : (
              safeItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="min-w-[180px] snap-start bg-white border border-[#e6d9ff] rounded-xl shadow-sm p-3 flex-shrink-0 mr-4"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-24 object-cover rounded-md border border-gray-200"
                  />
                  <div className="mt-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-[#3f2d70] truncate flex-1 mr-2">
                        {item.name}
                      </h4>
                      <p className="text-sm font-bold text-[#2d174d] whitespace-nowrap">
                        ₹{item.price}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-[#e3dbf9] text-[#4d2c91] text-sm font-bold flex items-center justify-center hover:bg-[#d1c2f3] transition"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="text-sm text-gray-700 w-6 text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-[#e3dbf9] text-[#4d2c91] text-sm font-bold flex items-center justify-center hover:bg-[#d1c2f3] transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
      </div>
    </motion.div>
  );
};

export default MenuCarousel;