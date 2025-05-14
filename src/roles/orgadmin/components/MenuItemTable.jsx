// import React from 'react';
// import { Edit2, Trash2 } from 'lucide-react';

// function MenuItemTable({ items, onEdit, onDelete }) {
//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Item
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Category
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Price
//             </th>
//             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {items.map((item) => (
//             <tr key={item.id} className="hover:bg-gray-50">
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="flex items-center">
//                   <div className="h-10 w-10 flex-shrink-0">
//                     <img
//                       className="h-10 w-10 rounded-full object-cover"
//                       src={item.image}
//                       alt={item.name}
//                     />
//                   </div>
//                   <div className="ml-4">
//                     <div className="text-sm font-medium text-gray-900">{item.name}</div>
//                     <div className="text-sm text-gray-500">{item.description}</div>
//                   </div>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">{item.category}</div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                 <button
//                   onClick={() => onEdit(item)}
//                   className="text-oa-primary hover:text-oa-primary-dark mr-3"
//                 >
//                   <Edit2 size={16} />
//                 </button>
//                 <button
//                   onClick={() => onDelete(item.id)}
//                   className="text-red-600 hover:text-red-900"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default MenuItemTable;
// src/roles/orgadmin/components/MenuItemTable.jsx
import React from 'react';

export default function MenuItemTable({ items, onUpdate, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{item.category}</td>
              <td className="py-2 px-4 border-b space-x-2">
                <button
                  onClick={() =>
                    onUpdate(item.id, { ...item, price: item.price + 1 })
                  }
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}