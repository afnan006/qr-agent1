// // // // src/roles/orgadmin/pages/Tables.jsx
// // // import React from 'react';
// // // import { motion } from 'framer-motion';
// // // import TableList from '../components/TableList';

// // // const Tables = () => {
// // //   const mockTables = [
// // //     { id: 1, name: 'Table 1', status: 'occupied' },
// // //     { id: 2, name: 'Table 2', status: 'available' },
// // //   ];

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0 }}
// // //       animate={{ opacity: 1 }}
// // //       exit={{ opacity: 0 }}
// // //       className="p-6 bg-[#F5F7FA] min-h-screen"
// // //     >
// // //       <h1 className="text-2xl font-bold text-[#008080] mb-6">Tables</h1>
// // //       <TableList
// // //         tables={mockTables}
// // //         onUpdateStatus={() => {}}
// // //       />
// // //     </motion.div>
// // //   );
// // // };

// // // export default Tables;

// // // src/roles/orgadmin/pages/Tables.jsx
// // import React, { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import TableList from '../components/TableList';
// // import { orgadminApi } from '../api/orgadminApi';

// // export default function Tables() {
// //   const [tables, setTables] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const fetchTables = async () => {
// //       try {
// //         const fetchedTables = await orgadminApi.getTables();
// //         setTables(fetchedTables);
// //       } catch (err) {
// //         console.error('Error fetching tables:', err);
// //         setError(err.message || 'Failed to load tables.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchTables();
// //   }, []);

// //   const handleBulkCreateTables = async (count) => {
// //     try {
// //       const newTables = await orgadminApi.bulkCreateTables(count);
// //       setTables((prevTables) => [...prevTables, ...newTables]);
// //     } catch (err) {
// //       console.error('Error creating tables:', err.message);
// //     }
// //   };

// //   const handleDeleteTables = async (tableIds) => {
// //     try {
// //       const result = await orgadminApi.deleteTables(tableIds);
// //       setTables((prevTables) =>
// //         prevTables.filter((table) => !tableIds.includes(table.id))
// //       );
// //       alert(`${result.message}`);
// //     } catch (err) {
// //       console.error('Error deleting tables:', err.message);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
// //         <p className="text-gray-600">Loading...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
// //         <p className="text-red-500">{error}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       className="p-6 bg-[#F5F7FA] min-h-screen"
// //     >
// //       <h1 className="text-2xl font-bold text-[#008080] mb-6">Tables</h1>
// //       <TableList
// //         tables={tables}
// //         onBulkCreate={handleBulkCreateTables}
// //         onDelete={handleDeleteTables}
// //       />
// //     </motion.div>
// //   );
// // }

// // pages/Tables.jsx
// import React, { useEffect, useState } from 'react';
// import { orgadminApi } from '../api/orgadminApi';

// const Tables = () => {
//   const [tables, setTables] = useState([]);
//   const [newTables, setNewTables] = useState(['']);
//   const [bulkCount, setBulkCount] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const fetchTables = async () => {
//     try {
//       setLoading(true);
//       const data = await orgadminApi.getTables();
//       setTables(data.tables || data);
//     } catch (error) {
//       console.error('Error fetching tables:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddTables = async () => {
//     try {
//       await orgadminApi.addTables(newTables.filter(Boolean));
//       setNewTables(['']);
//       await fetchTables();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await orgadminApi.deleteTables([id]);
//       await fetchTables();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleBulkCreate = async () => {
//     try {
//       await orgadminApi.bulkCreateTables(bulkCount);
//       await fetchTables();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchTables();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">🍽️ Tables</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul className="mb-4">
//           {tables.map((table) => (
//             <li key={table.id} className="flex justify-between border-b py-2">
//               <span>{table.name}</span>
//               <button
//                 className="bg-red-600 text-white px-3 py-1"
//                 onClick={() => handleDelete(table.id)}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       <div className="mb-4">
//         <h3 className="font-semibold mb-2">➕ Add Tables</h3>
//         {newTables.map((value, idx) => (
//           <input
//             key={idx}
//             type="text"
//             placeholder={`Table ${idx + 1}`}
//             className="border px-2 py-1 mb-2 mr-2"
//             value={value}
//             onChange={(e) => {
//               const temp = [...newTables];
//               temp[idx] = e.target.value;
//               setNewTables(temp);
//             }}
//           />
//         ))}
//         <button
//           className="bg-blue-600 text-white px-3 py-1 mr-2"
//           onClick={() => setNewTables([...newTables, ''])}
//         >
//           ➕ Add More
//         </button>
//         <button className="bg-green-600 text-white px-4 py-1" onClick={handleAddTables}>
//           Add Tables
//         </button>
//       </div>

//       <div>
//         <h3 className="font-semibold mb-2">⚡ Bulk Create Tables</h3>
//         <input
//           type="number"
//           className="border px-2 py-1"
//           value={bulkCount}
//           onChange={(e) => setBulkCount(Number(e.target.value))}
//         />
//         <button className="bg-purple-600 text-white px-4 py-1 ml-2" onClick={handleBulkCreate}>
//           Bulk Create
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Tables;

import React, { useEffect, useState } from 'react';
import { orgadminApi } from '../api/orgadminApi';

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [newTables, setNewTables] = useState(['']);
  const [bulkCount, setBulkCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTables = async () => {
    try {
      setLoading(true);
      const data = await orgadminApi.getTables();
      setTables(data.tables || data); // handles array or {tables: []}
    } catch (err) {
      console.error('Error fetching tables:', err.message);
      setError('Failed to load tables.');
    } finally {
      setLoading(false);
    }
  };

  // const handleAddTables = async () => {
  //   try {
  //     const validTables = newTables.filter(t => t.trim() !== '');
  //     if (validTables.length === 0) return alert('Enter at least one table name.');
  //     const payload = {
  //       tables: validTables.map((number) => ({ number })),
  //     };
  //     await orgadminApi.addTables({ number: "Table 7" });
  //     setNewTables(['']);
  //     await fetchTables();
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };
  const handleAddTables = async () => {
  try {
    const validTables = newTables.filter(t => t.trim() !== '');
    if (validTables.length === 0) return alert('Enter at least one table name.');

    // Decide whether to send single or multiple
    const payload =
      validTables.length === 1
        ? { number: validTables[0].trim() }
        : validTables.map(number => number.trim());

    await orgadminApi.addTables(payload);

    setNewTables(['']);
    await fetchTables();
  } catch (err) {
    alert(err.message);
  }
};


  // const handleDelete = async (id) => {
  //   try {
  //     await orgadminApi.deleteTables({ table_ids: [id] });
  //     await fetchTables();
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };
  const handleDelete = async (id) => {
  try {
    await orgadminApi.deleteTables([id]); // 💥 only array passed
    await fetchTables();
  } catch (err) {
    alert(err.message);
  }
};


  const handleBulkCreate = async () => {
    try {
      if (bulkCount < 1) return alert('Enter a valid count.');
      await orgadminApi.bulkCreateTables(bulkCount); // Just the number!
      await fetchTables();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🍽️ Tables Management</h2>

      {loading ? (
        <p>Loading tables...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          {tables.length === 0 ? (
            <p>No tables found.</p>
          ) : (
            <ul className="mb-6 space-y-4">
              {tables.map((table) => (
                <li
                  key={table.id}
                  className="flex items-center justify-between border p-3 rounded shadow-sm"
                >
                  <div>
                    <p className="font-medium">🪑 {table.number}</p>
                    {table.qr_code_url && (
                      <img
                        src={table.qr_code_url}
                        alt={`QR for ${table.number}`}
                        className="mt-2 w-24 h-24"
                      />
                    )}
                  </div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(table.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <div className="mb-8">
        <h3 className="font-semibold mb-2">➕ Add Tables Manually</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {newTables.map((value, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Table ${idx + 1}`}
              className="border px-2 py-1 rounded"
              value={value}
              onChange={(e) => {
                const updated = [...newTables];
                updated[idx] = e.target.value;
                setNewTables(updated);
              }}
            />
          ))}
        </div>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
          onClick={() => setNewTables([...newTables, ''])}
        >
          ➕ Add More
        </button>
        <button
          className="bg-green-600 text-white px-4 py-1 rounded"
          onClick={handleAddTables}
        >
          Add Tables
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-2">⚡ Bulk Create Tables</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            className="border px-2 py-1 rounded w-20"
            value={bulkCount}
            onChange={(e) => setBulkCount(Number(e.target.value))}
          />
          <button
            className="bg-purple-600 text-white px-4 py-1 rounded"
            onClick={handleBulkCreate}
          >
            Bulk Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tables;
