import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SyllabusDisplay = () => {
  const [syllabusData, setSyllabusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      const response = await fetch('https://alec-institue.onrender.com/syllabus/alldisplay');
      if (!response.ok) {
        throw new Error('Failed to fetch syllabus data');
      }

      const data = await response.json();
      console.log('Fetched Syllabus:', data);

      const syllabusArray = Array.isArray(data.data) ? data.data : [];
      setSyllabusData(syllabusArray);
      toast.success('Syllabus data loaded successfully');
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error('Error fetching syllabus data: ' + err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this syllabus entry?');
    if (!confirm) return;

    try {
      const response = await fetch(`https://alec-institue.onrender.com/syllabus/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete syllabus entry');
      }

      setSyllabusData(prev => prev.filter(item => item._id !== id));
      toast.success('Syllabus entry deleted successfully');
    } catch (err) {
      setError(err.message);
      toast.error('Error deleting syllabus entry: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const columns = [
    {
      name: 'Course Name',
      selector: row => row.Coursename || 'N/A',
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category?.name || 'N/A',
      sortable: true,
    },
    {
      name: 'PDF Brochure',
      selector: row => row.PDFbrochure,
      cell: row => (
        <div>
          {row.PDFbrochure ? (
            <a href={row.PDFbrochure} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View PDF
            </a>
          ) : (
            'None'
          )}
        </div>
      ),
    },
    {
      name: 'Created At',
      selector: row => row.createdAt,
      sortable: true,
      cell: row => <div>{formatDate(row.createdAt)}</div>,
    },
    {
      name: 'Updated At',
      selector: row => row.updatedAt,
      sortable: true,
      cell: row => <div>{formatDate(row.updatedAt)}</div>,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
          onClick={() => handleDelete(row._id)}
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          <FaTrash />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredSyllabus = Array.isArray(syllabusData)
    ? syllabusData.filter(
        item =>
          (item.Coursename?.toLowerCase().includes(filterText.toLowerCase()) ||
           item._id.toLowerCase().includes(filterText.toLowerCase())) ||
          item.category?.name?.toLowerCase().includes(filterText.toLowerCase())
      )
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-700">Loading syllabus data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Syllabus Data</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Course Name or Category..."
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredSyllabus}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent="No syllabus entries found."
        />
      </div>
    </div>
  );
};

export default SyllabusDisplay;