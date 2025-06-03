import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import DOMPurify from 'dompurify';

const MainDisplay = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/main/display');
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses. Please try again.");
      setLoading(false);
    }
  };

  const delcourse = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    const deleteApi = `http://localhost:8000/main/${id}`;

    try {
      await axios.delete(deleteApi);
      toast.success('Course deleted successfully');
      setCourses(prev => prev.filter(course => course._id !== id));
    } catch (error) {
      toast.error('Error deleting course');
      console.log('Error deleting course:', error);
    }
  };

  // Define columns for the data table
  const columns = [
    {
      name: 'Price',
      selector: row => row.Price,
      sortable: true,
    },
    {
      name: 'Test Module',
      selector: row => row.testmodule,
      sortable: true,
    },
    {
      name: 'Duration',
      selector: row => row.Durations,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category?.name || 'N/A',
      sortable: true,
    },
    {
      name: 'Description',
      cell: (row) => (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(row.CourseDescription || ''),
          }}
          style={{ maxWidth: '300px', overflowWrap: 'break-word' }}
        />
      ),
      width: '300px',
    },
    {
      name: 'Last Date',
      selector: row => new Date(row.LastDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
          onClick={() => delcourse(row._id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Filter courses based on search text
  const filteredCourses = courses.filter(course => {
    const searchString = searchText.toLowerCase();
    return (
      course.testmodule?.toLowerCase().includes(searchString) ||
      course.Durations?.toLowerCase().includes(searchString) ||
      course.category?.name?.toLowerCase().includes(searchString) ||
      course.CourseDescription?.toLowerCase().includes(searchString)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Course Tests</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="px-4 py-2 border rounded-md w-full max-w-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredCourses}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
        striped
        customStyles={{
          headCells: {
            style: {
              fontWeight: 'bold',
              fontSize: '14px',
              backgroundColor: '#f8fafc',
            },
          },
          cells: {
            style: {
              fontSize: '14px',
            },
          },
        }}
      />
    </div>
  );
};

export default MainDisplay;
