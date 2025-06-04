// // import React from 'react';
// // import { motion } from 'framer-motion';

// // const OrderedItemsList = ({ items }) => {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="w-full p-4 bg-white rounded-lg shadow-md"
// //     >
// //       <h3 className="text-lg font-semibold mb-4">Your Orders</h3>
// //       {items.length === 0 ? (
// //         <p className="text-center text-gray-600">No orders yet.</p>
// //       ) : (
// //         <ul className="space-y-4">
// //           {items.map((item) => (
// //             <li key={item.id} className="flex items-start">
// //               <img
// //                 src={item.image}
// //                 alt={item.name}
// //                 className="w-16 h-16 object-cover rounded-lg"
// //               />
// //               <div className="ml-4">
// //                 <h4 className="text-sm font-medium">{item.name}</h4>
// //                 <p className="text-xs text-gray-600">{item.description}</p>
// //                 <p className="text-sm font-bold mt-1">₹{item.price}</p>
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </motion.div>
// //   );
// // };

// // export default OrderedItemsList;
// import React from 'react';
// import { motion } from 'framer-motion';

// const SkeletonOrderItem = () => (
//   <div className="flex items-start space-x-4 animate-pulse">
//     <div className="w-16 h-16 bg-gray-300 rounded-lg" />
//     <div className="flex-1 space-y-2">
//       <div className="w-3/4 h-4 bg-gray-300 rounded" />
//       <div className="w-5/6 h-3 bg-gray-200 rounded" />
//       <div className="w-1/2 h-4 bg-gray-300 rounded" />
//     </div>
//   </div>
// );

// const OrderedItemsList = ({ items = [], loading = false }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//       className="w-full p-4 bg-[#fdfcff] border border-[#e1d6fd] rounded-xl shadow-inner"
//     >
//       <h3 className="text-lg font-bold text-[#4d2c91] mb-3 px-1">Your Orders</h3>

//       {loading ? (
//         <div className="space-y-4">
//           {Array.from({ length: 3 }).map((_, i) => (
//             <SkeletonOrderItem key={i} />
//           ))}
//         </div>
//       ) : items.length === 0 ? (
//         <p className="text-center text-gray-500 py-4">You haven’t ordered anything yet 😔</p>
//       ) : (
//         <ul className="space-y-4 max-h-[320px] overflow-y-auto pr-1 scrollbar-hide">
//           {items.map((item) => (
//             <li key={item.id} className="flex items-start">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-16 h-16 object-cover rounded-lg border border-gray-200"
//               />
//               <div className="ml-4 flex-1">
//                 <h4 className="text-sm font-semibold text-[#3f2d70]">{item.name}</h4>
//                 <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
//                 <p className="text-sm font-bold text-[#2d174d] mt-1">₹{item.price}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </motion.div>
//   );
// };

// export default OrderedItemsList;







import React from 'react';
import { motion } from 'framer-motion';

const SkeletonOrderCard = () => (
  <div className="min-w-[260px] h-32 bg-[#f8f6ff] rounded-lg shadow-md p-4 flex space-x-4 animate-pulse border border-[#ded7f3]">
    <div className="w-20 h-20 bg-gray-300 rounded-md skeleton" />
    <div className="flex flex-col justify-between flex-1">
      <div className="w-3/4 h-4 bg-gray-300 rounded skeleton" />
      <div className="w-full h-3 bg-gray-200 rounded skeleton" />
      <div className="w-1/2 h-4 bg-gray-300 rounded skeleton" />
    </div>
  </div>
);

const OrderedItemsList = ({ items = [], loading = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="w-full mt-4 p-3 bg-[#fdfcff] border border-[#dcd2fa] rounded-xl shadow-inner"
    >
      <h3 className="text-md font-bold text-[#4d2c91] mb-1 px-1">🍽️ Your Orders</h3>

      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => <SkeletonOrderCard key={i} />)
          : items.length === 0 ? (
              <div className="min-w-full text-center py-4">
                <p className="text-gray-500 text-sm">You haven't ordered anything yet 😔</p>
              </div>
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
                      {item.status && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'Delivered' 
                            ? 'bg-[#e6f7ee] text-[#0a7b4e]' 
                            : item.status === 'Cancelled'
                            ? 'bg-[#feeceb] text-[#d92c20]'
                            : 'bg-[#e3dbf9] text-[#4d2c91]'
                        }`}>
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
      </div>
    </motion.div>
  );
};

export default OrderedItemsList;