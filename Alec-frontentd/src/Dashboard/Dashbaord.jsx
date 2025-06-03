import { FaGraduationCap, FaEnvelope, FaUsers, FaChartLine } from 'react-icons/fa';
import React from 'react';
const Dashboard = () => {
  // Sample data - replace with your actual data
  const stats = {
    totalCourseEnquiries: 1245,
    totalContactEnquiries: 892,
    todayEnquiries: 42,
    conversionRate: 68.5
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Course Enquiries Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium opacity-80">Total Course Enquiries</p>
              <h2 className="text-3xl font-bold mt-2">{stats.totalCourseEnquiries}</h2>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FaGraduationCap className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaChartLine className="mr-1" />
            <span>12% increase from last month</span>
          </div>
        </div>

        {/* Total Contact Enquiries Card */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium opacity-80">Total Contact Enquiries</p>
              <h2 className="text-3xl font-bold mt-2">{stats.totalContactEnquiries}</h2>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FaEnvelope className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaChartLine className="mr-1" />
            <span>8% increase from last month</span>
          </div>
        </div>

        {/* Today's Enquiries Card */}
        <div className="bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium opacity-80">Today's Enquiries</p>
              <h2 className="text-3xl font-bold mt-2">{stats.todayEnquiries}</h2>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FaUsers className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <FaChartLine className="mr-1" />
            <span>3% increase from yesterday</span>
          </div>
        </div>

        {/* Conversion Rate Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-lime-400 rounded-xl shadow-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium opacity-80">Conversion Rate</p>
              <h2 className="text-3xl font-bold mt-2">{stats.conversionRate}%</h2>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FaChartLine className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span>2% increase from last quarter</span>
          </div>
        </div>
      </div>

      {/* Additional Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Enquiries</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample rows - replace with actual data */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Web Development</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-15</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Data Science</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-14</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              <span className="text-indigo-700 font-medium">Add New Course</span>
              <span className="text-indigo-500">+</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <span className="text-blue-700 font-medium">View All Enquiries</span>
              <span className="text-blue-500">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
              <span className="text-emerald-700 font-medium">Generate Report</span>
              <span className="text-emerald-500">↓</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;