import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronUp, ChevronDown, X } from 'lucide-react';

const JudgementDisplay = () => {
  const [judgements, setJudgements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchJudgements = async () => {
      try {
        const response = await axios.get('https://alec-institue.onrender.com/judement/display');
        setJudgements(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchJudgements();
  }, []);

  const deleteJudgement = async (id) => {
    if (!window.confirm('Are you sure you want to delete this judgement?')) return;
    try {
      await axios.delete(`https://alec-institue.onrender.com/judement/${id}`);
      setJudgements(prev => prev.filter(j => j._id !== id));
    } catch (err) {
      alert('Failed to delete judgement');
    }
  };

  const filteredJudgements = judgements.filter(j =>
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.subTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.publicerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedJudgements = [...filteredJudgements].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedJudgements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedJudgements.length / itemsPerPage);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ?
      <ChevronUp className="inline ml-1 h-4 w-4" /> :
      <ChevronDown className="inline ml-1 h-4 w-4" />;
  };

  const openImageModal = (imageUrl) => setSelectedImage(imageUrl);
  const closeImageModal = () => setSelectedImage(null);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Judgements</h1>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search judgements..."
          className="pl-10 pr-4 py-2 w-full md:w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Publisher</th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => requestSort('title')}
              >
                Title {getSortIcon('title')}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => requestSort('subTitle')}
              >
                Sub Title {getSortIcon('subTitle')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => requestSort('lastDate')}
              >
                Last Date {getSortIcon('lastDate')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((judgement) => (
              <tr key={judgement._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {judgement.images?.length > 0 ? (
                    <div className="flex space-x-2">
                      {judgement.images.slice(0, 2).map((img, i) => (
                        <button key={i} onClick={() => openImageModal(img)} className="hover:opacity-75">
                          <img src={img} alt="preview" className="h-10 w-10 object-cover rounded border" />
                        </button>
                      ))}
                      {judgement.images.length > 2 && (
                        <button
                          onClick={() => openImageModal(judgement.images[2])}
                          className="flex items-center justify-center h-10 w-10 rounded bg-gray-100 text-gray-500 text-xs"
                        >
                          +{judgement.images.length - 2}
                        </button>
                      )}
                    </div>
                  ) : 'No images'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{judgement.publicerName || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{judgement.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{judgement.subTitle || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{judgement.category?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{judgement.description || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {judgement.lastDate ? new Date(judgement.lastDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteJudgement(judgement._id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredJudgements.length)} of {filteredJudgements.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredJudgements.length === 0 && (
        <div className="text-center py-8 text-gray-500">No judgements found matching your search criteria</div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-screen overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Image Preview</h3>
              <button onClick={closeImageModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <img src={selectedImage} alt="Preview" className="max-w-full max-h-[80vh] object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JudgementDisplay;
