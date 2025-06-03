import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchcategory } from "../../api";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MainForm = () => {
  const [formData, setFormData] = useState({
    Price: '',
    testmodule: '',
    Durations: '',
    category: '',
    CourseDescription: '',
    LastDate: ''
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchcategory();
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.Price) newErrors.Price = 'Price is required';
    if (!formData.testmodule) newErrors.testmodule = 'Module name is required';
    if (!formData.CourseDescription || formData.CourseDescription === '<p></p>') {
      newErrors.CourseDescription = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    data.append('Price', formData.Price);
    data.append('testmodule', formData.testmodule);
    data.append('Durations', formData.Durations);
    data.append('category', formData.category);
    data.append('CourseDescription', formData.CourseDescription);
    data.append('LastDate', formData.LastDate);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/main/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      toast.success('Course created successfully!');
      setFormData({
        Price: '',
        testmodule: '',
        Durations: '',
        category: '',
        CourseDescription: '',
        LastDate: ''
      });
      setErrors({});
    } catch (err) {
      console.error('Submission error:', err);
      if (err.response) {
        toast.error(`Failed to create course: ${err.response.data.message || 'Server error'}`);
      } else if (err.code === 'ECONNABORTED') {
        toast.error('Request timed out. Please try again.');
      } else {
        toast.error('Failed to create course. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Create New Main Test</h2>
            <p className="text-gray-600 mt-2">Fill in the details below to create a new course</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="Price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  id="Price"
                  name="Price"
                  value={formData.Price}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.Price ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.Price && <p className="mt-1 text-sm text-red-600">{errors.Price}</p>}
              </div>

              <div>
                <label htmlFor="testmodule" className="block text-sm font-medium text-gray-700 mb-1">Test type</label>
                <input
                  type="text"
                  id="testmodule"
                  name="testmodule"
                  value={formData.testmodule}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.testmodule ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.testmodule && <p className="mt-1 text-sm text-red-600">{errors.testmodule}</p>}
              </div>

              <div>
                <label htmlFor="Durations" className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  id="Durations"
                  name="Durations"
                  value={formData.Durations}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="CourseDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <div className="border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                <CKEditor
                  editor={ClassicEditor}
                  data={formData.CourseDescription}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setFormData(prev => ({ ...prev, CourseDescription: data }));
                    if (errors.CourseDescription) {
                      setErrors(prev => ({ ...prev, CourseDescription: '' }));
                    }
                  }}
                />
              </div>
              {errors.CourseDescription && <p className="mt-1 text-sm text-red-600">{errors.CourseDescription}</p>}
            </div>

            <div>
              <label htmlFor="LastDate" className="block text-sm font-medium text-gray-700 mb-1">Last Date</label>
              <input
                type="date"
                id="LastDate"
                name="LastDate"
                value={formData.LastDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainForm;
