
// // pages/MenuItems.jsx
// import React, { useEffect, useState } from 'react';
// import { orgadminApi } from '../api/orgadminApi';

// const defaultItem = {
//   name: '',
//   price: 0,
//   category: '',
//   dietary_preference: '',
//   available_times: '',
//   is_available: true,
// };

// const MenuItems = () => {
//   const [items, setItems] = useState([]);
//   const [newItem, setNewItem] = useState(defaultItem);
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [bulkFile, setBulkFile] = useState(null);

//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const data = await orgadminApi.getMenuItems();
//       setItems(data.menu_items || data);
//     } catch (error) {
//       console.error('Error fetching menu items:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateOrUpdate = async () => {
//     try {
//       if (editingId) {
//         await orgadminApi.updateMenuItem(editingId, newItem);
//       } else {
//         await orgadminApi.createMenuItem(newItem);
//       }
//       setNewItem(defaultItem);
//       setEditingId(null);
//       await fetchItems();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleEdit = (item) => {
//     setNewItem(item);
//     setEditingId(item.id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this item?')) return;
//     try {
//       await orgadminApi.deleteMenuItem(id);
//       await fetchItems();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleBulkUpload = async () => {
//     if (!bulkFile) return alert('Please select a file first.');
//     try {
//       await orgadminApi.bulkImportMenuItems(bulkFile);
//       setBulkFile(null);
//       await fetchItems();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewItem((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen text-gray-800">
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-3xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
//           📋 Menu Items
//         </h2>

//         {/* Add/Edit Menu Item */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold mb-2 text-gray-700">
//             {editingId ? '✏️ Edit Item' : '➕ Add New Item'}
//           </h3>
//           <div className="flex flex-col gap-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input name="name" placeholder="Name" className="input" value={newItem.name} onChange={handleChange} />
//               <input name="price" type="number" placeholder="Price" className="input" value={newItem.price} onChange={handleChange} />
//               <input name="category" placeholder="Category" className="input" value={newItem.category} onChange={handleChange} />
//               <input name="dietary_preference" placeholder="Dietary Preference" className="input" value={newItem.dietary_preference} onChange={handleChange} />
//               <input name="available_times" placeholder="Available Times" className="input" value={newItem.available_times} onChange={handleChange} />
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" name="is_available" checked={newItem.is_available} onChange={handleChange} />
//                 Available?
//               </label>
//             </div>
//             <div className="flex gap-4">
//               <button
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded"
//                 onClick={handleCreateOrUpdate}
//               >
//                 {editingId ? 'Update' : 'Add'}
//               </button>
//               {editingId && (
//                 <button
//                   className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded"
//                   onClick={() => {
//                     setNewItem(defaultItem);
//                     setEditingId(null);
//                   }}
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bulk Upload */}
//         <div className="mb-10">
//           <h3 className="text-xl font-semibold mb-2 text-gray-700">📦 Bulk Import</h3>
//           <div className="flex items-center gap-4">
//             <input
//               type="file"
//               className="border border-gray-300 rounded px-2 py-1"
//               onChange={(e) => setBulkFile(e.target.files[0])}
//             />
//             <button
//               className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded"
//               onClick={handleBulkUpload}
//             >
//               Upload
//             </button>
//           </div>
//         </div>

//         {/* Menu List */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4 text-gray-700">🍔 Current Menu</h3>
//           {loading ? (
//             <div className="text-center py-10">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
//               <p>Fetching those delicious items...</p>
//             </div>
//           ) : items.length === 0 ? (
//             <p className="text-gray-500">No menu items yet. Add some!</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {items.map((item) => (
//                 <div key={item.id} className="bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition relative">
//                   <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
//                   <p className="text-sm text-gray-600">₹{item.price}</p>
//                   <p className="text-sm text-gray-500">Category: {item.category}</p>
//                   <p className="text-sm text-gray-500">Diet: {item.dietary_preference}</p>
//                   <p className="text-sm text-gray-500">Time: {item.available_times}</p>
//                   <p className="text-sm text-gray-500">Status: {item.is_available ? 'Available' : 'Unavailable'}</p>
//                   <div className="absolute top-2 right-2 flex gap-2">
//                     <button className="text-blue-600" onClick={() => handleEdit(item)}>Edit</button>
//                     <button className="text-red-600" onClick={() => handleDelete(item.id)}>Delete</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuItems;
// // ------------------------------------------------ORIGINAL--------------------------------




import React, { useEffect, useState } from 'react';
import { orgadminApi } from '../api/orgadminApi';

const defaultItem = {
  name: '',
  price: 0,
  category: '',
  dietary_preference: '',
  available_times: [],
  is_available: true,
  img_url: ''
};

const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Other'];

const MenuItems = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState(defaultItem);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bulkFile, setBulkFile] = useState(null);
  const [otherCategory, setOtherCategory] = useState('');

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await orgadminApi.getMenuItems();
      setItems(data.menu_items || data);
    } catch (error) {
      console.error('Error fetching menu items:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreateOrUpdate = async () => {
    try {
      const payload = {
        ...newItem,
        category: newItem.category === 'Other' ? otherCategory : newItem.category,
        available_times: newItem.available_times.join(', '),
      };

      if (!payload.name.trim()) return alert("Name is required");

      if (editingId) {
        await orgadminApi.updateMenuItem(editingId, payload);
      } else {
        await orgadminApi.createMenuItem(payload);
      }

      setNewItem(defaultItem);
      setOtherCategory('');
      setEditingId(null);
      await fetchItems();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setNewItem({
      ...item,
      available_times: item.available_times.split(',').map(s => s.trim())
    });
    if (!categories.includes(item.category)) {
      setNewItem(prev => ({ ...prev, category: 'Other' }));
      setOtherCategory(item.category);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await orgadminApi.deleteMenuItem(id);
      await fetchItems();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBulkUpload = async () => {
    if (!bulkFile) return alert('Please select a file first.');
    try {
      await orgadminApi.bulkImportMenuItems(bulkFile);
      setBulkFile(null);
      await fetchItems();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'available_times') {
      setNewItem((prev) => {
        const updated = checked
          ? [...prev.available_times, value]
          : prev.available_times.filter((t) => t !== value);
        return { ...prev, available_times: updated };
      });
    } else if (name === 'is_available') {
      setNewItem((prev) => ({ ...prev, [name]: checked }));
    } else {
      setNewItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
          📋 Menu Items
        </h2>

        {/* Add/Edit Menu Item */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">
            {editingId ? '✏️ Edit Item' : '➕ Add New Item'}
          </h3>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                name="name"
                placeholder="Name (required)"
                className="input border px-3 py-2 rounded"
                value={newItem.name}
                onChange={handleChange}
              />

              <div className="relative">
                <span className="absolute left-2 top-2 text-gray-500">₹</span>
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  className="input border px-6 py-2 rounded w-full"
                  value={newItem.price}
                  onChange={handleChange}
                />
              </div>

              <select
                name="category"
                value={newItem.category}
                onChange={handleChange}
                className="input border px-3 py-2 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {newItem.category === 'Other' && (
                <input
                  placeholder="Custom Category"
                  value={otherCategory}
                  onChange={(e) => setOtherCategory(e.target.value)}
                  className="input border px-3 py-2 rounded"
                />
              )}

              <div className="flex gap-4 items-center">
                <label><input type="radio" name="dietary_preference" value="Veg" checked={newItem.dietary_preference === 'Veg'} onChange={handleChange} /> Veg</label>
                <label><input type="radio" name="dietary_preference" value="Non-Veg" checked={newItem.dietary_preference === 'Non-Veg'} onChange={handleChange} /> Non-Veg</label>
                <label><input type="radio" name="dietary_preference" value="Contains Egg" checked={newItem.dietary_preference === 'Contains Egg'} onChange={handleChange} /> Contains Egg</label>
              </div>

              <div className="flex gap-4 flex-wrap">
                {['Breakfast', 'Lunch', 'Dinner', 'All Times'].map(time => (
                  <label key={time}>
                    <input
                      type="checkbox"
                      name="available_times"
                      value={time}
                      checked={newItem.available_times.includes(time)}
                      onChange={handleChange}
                    /> {time}
                  </label>
                ))}
              </div>

              <input
                name="img_url"
                placeholder="Image URL (optional)"
                className="input border px-3 py-2 rounded"
                value={newItem.img_url}
                onChange={handleChange}
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={newItem.is_available}
                  onChange={handleChange}
                />
                Available?
              </label>
            </div>

            <div className="flex gap-4">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded"
                onClick={handleCreateOrUpdate}
              >
                {editingId ? 'Update' : 'Add'}
              </button>
              {editingId && (
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded"
                  onClick={() => {
                    setNewItem(defaultItem);
                    setEditingId(null);
                    setOtherCategory('');
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bulk Upload */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">📦 Bulk Import</h3>
          <div className="flex items-center gap-4">
            <input
              type="file"
              className="border border-gray-300 rounded px-2 py-1"
              onChange={(e) => setBulkFile(e.target.files[0])}
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded"
              onClick={handleBulkUpload}
            >
              Upload
            </button>
          </div>
        </div>

        {/* Menu List */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">🍔 Current Menu</h3>
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
              <p>Fetching those delicious items...</p>
            </div>
          ) : items.length === 0 ? (
            <p className="text-gray-500">No menu items yet. Add some!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition relative">
                  <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                  <p className="text-sm text-gray-500">Category: {item.category}</p>
                  <p className="text-sm text-gray-500">Diet: {item.dietary_preference}</p>
                  <p className="text-sm text-gray-500">Time: {item.available_times}</p>
                  <p className="text-sm text-gray-500">Status: {item.is_available ? 'Available' : 'Unavailable'}</p>
                  {item.img_url && <img src={item.img_url} alt={item.name} className="w-full h-32 object-cover rounded mt-2" />}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button className="text-blue-600" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="text-red-600" onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
