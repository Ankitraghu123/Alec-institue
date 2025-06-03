import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogDisplay = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('https://alec-institue.onrender.com/blog/display');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data = await response.json();
      console.log('Fetched blogs:', data);

      const blogsArray = Array.isArray(data) ? data : data.data || [];
      setBlogs(blogsArray);
      toast.success('Blogs loaded successfully');
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error('Error fetching blogs: ' + err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if (!confirm) return;

    try {
      const response = await fetch(`https://alec-institue.onrender.com/blog/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      setBlogs(prev => prev.filter(blog => blog._id !== id));
      toast.success('Blog deleted successfully');
    } catch (err) {
      setError(err.message);
      toast.error('Error deleting blog: ' + err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Author',
      selector: row => row.author,
      sortable: true,
    },
    {
      name: 'Excerpt',
      selector: row => row.excerpt,
      wrap: true,
    },
       {
      name: 'URL',
      selector: row => row.URL,
      wrap: true,
    },
    {
      name: 'Last Updated',
      selector: row => row.LastDate,
      sortable: true,
      cell: row => <div>{formatDate(row.LastDate)}</div>,
    },
    {
      name: 'Images',
      cell: row => (
        <div className="w-16 h-16">
          <img
            src={
              Array.isArray(row.images) && row.images.length > 0
                ? row.images[0]
                : 'https://via.placeholder.com/48x48?text=No+Image'
            }
            alt={row.title || 'No Title'}
            className="w-full h-full object-cover rounded"
          />
        </div>
      ),
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

  const filteredBlogs = Array.isArray(blogs)
    ? blogs.filter(
        item =>
          item.title?.toLowerCase().includes(filterText.toLowerCase()) ||
          item.author?.toLowerCase().includes(filterText.toLowerCase()) ||
          item.excerpt?.toLowerCase().includes(filterText.toLowerCase())
      )
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-700">Loading blogs...</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Blog Posts</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title, author, or excerpt..."
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredBlogs}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent="No blog posts found."
        />
      </div>
    </div>
  );
};

export default BlogDisplay;
