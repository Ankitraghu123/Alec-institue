// import React, { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import axios from "axios";

// const URLdisplay = () => {
//     const [urls, setUrls] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedURL, setSelectedURL] = useState(null);

//     const fetchAllURLs = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/url/display');
//             setUrls(response.data.data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchURLById = async (id) => {
//         try {
//             const response = await axios.get(`http://localhost:8000/url/${id}`);
//             setSelectedURL(response.data);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const deleteURL = async (id) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this URL?");
//         if (!confirmDelete) return;

//         try {
//             await axios.delete(`http://localhost:8000/url/${id}`);
//             fetchAllURLs(); // Refresh list after deletion
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     useEffect(() => {
//         fetchAllURLs();
//     }, []);

//     const columns = [
//         {
//             name: 'URL',
//             selector: row => row.URL || row.url || 'N/A',
//             sortable: true,
//             cell: row => (
//                 <a
//                     href={row.URL || row.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                 >
//                     {row.URL || row.url}
//                 </a>
//             ),
//         },
//         {
//             name: 'Action',
//             cell: row => (
//                 <div className="flex gap-2">
//                     <button
//                         onClick={() => fetchURLById(row._id)}
//                         className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                     >
//                         View
//                     </button>
//                     <button
//                         onClick={() => deleteURL(row._id)}
//                         className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ),
//         }
//     ];

//     return (
//         <div className="p-6 max-w-6xl mx-auto">
//             <h2 className="text-2xl font-bold mb-4">Video URLs</h2>

//             {loading && <div className="p-4">Loading...</div>}
//             {error && <div className="p-4 text-red-600">Error: {error}</div>}

//             {selectedURL && (
//                 <div className="mb-4 p-4 border rounded bg-blue-100 text-blue-900">
//                     <h3 className="font-semibold mb-2">Selected URL Details</h3>
//                     <p><strong>ID:</strong> {selectedURL._id || selectedURL.id}</p>
//                     <p>
//                         <strong>URL:</strong>{' '}
//                         <a
//                             href={selectedURL.URL || selectedURL.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-700 underline"
//                         >
//                             {selectedURL.URL || selectedURL.url}
//                         </a>
//                     </p>
//                     <button
//                         onClick={() => setSelectedURL(null)}
//                         className="mt-3 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
//                     >
//                         Close
//                     </button>
//                 </div>
//             )}

//             <DataTable
//                 title="Video URLs List"
//                 columns={columns}
//                 data={urls}
//                 pagination
//                 highlightOnHover
//                 responsive
//                 striped
//                 progressPending={loading}
//                 noDataComponent={<div className="p-4">No URLs available</div>}
//             />
//         </div>
//     );
// };

// export default URLdisplay;





import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllUrls,
  fetchUrlById,
  deleteUrl,
} from './Redux/UrlSlice';

const URLdisplay = () => {
  const dispatch = useDispatch();

  const { items: urls, loading, error, selectedUrl } = useSelector((state) => state.urls);

  useEffect(() => {
    dispatch(fetchAllUrls());
  }, [dispatch]);

  const handleView = (id) => {
    dispatch(fetchUrlById(id));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      dispatch(deleteUrl(id));
    }
  };

  const columns = [
    {
      name: 'URL',
      selector: (row) => row.URL || row.url || 'N/A',
      sortable: true,
      cell: (row) => (
        <a
          href={row.URL || row.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {row.URL || row.url}
        </a>
      ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(row._id)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            View
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Video URLs</h2>

      {loading && <div className="p-4">Loading...</div>}
      {error && <div className="p-4 text-red-600">Error: {error}</div>}

      {selectedUrl && (
        <div className="mb-4 p-4 border rounded bg-blue-100 text-blue-900">
          <h3 className="font-semibold mb-2">Selected URL Details</h3>
          <p><strong>ID:</strong> {selectedUrl._id || selectedUrl.id}</p>
          <p>
            <strong>URL:</strong>{' '}
            <a
              href={selectedUrl.URL || selectedUrl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline"
            >
              {selectedUrl.URL || selectedUrl.url}
            </a>
          </p>
          <button
            onClick={() => dispatch({ type: 'urls/clearSelectedUrl' })} // Optional custom action
            className="mt-3 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      )}

      <DataTable
        title="Video URLs List"
        columns={columns}
        data={urls}
        pagination
        highlightOnHover
        responsive
        striped
        progressPending={loading}
        noDataComponent={<div className="p-4">No URLs available</div>}
      />
    </div>
  );
};

export default URLdisplay;
