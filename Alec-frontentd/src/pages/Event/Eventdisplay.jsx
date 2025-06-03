import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const Eventdisplay = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [filterText, setFilterText] = useState('');

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/event');
      setContacts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setMessage({ text: 'Failed to load contacts', type: 'error' });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      await axios.delete(`http://localhost:8000/event/${id}`);
      setMessage({ text: 'Contact deleted successfully', type: 'success' });
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      setMessage({ text: 'Failed to delete contact', type: 'error' });
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingContact(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingContact) {
        await axios.put(`http://localhost:8000/event/${editingContact._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage({ text: 'Contact updated successfully', type: 'success' });
      } else {
        await axios.post('http://localhost:8000/event', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage({ text: 'Contact created successfully', type: 'success' });
      }
      fetchContacts();
      handleFormClose();
    } catch (error) {
      console.error('Error saving contact:', error);
      setMessage({ text: error.response?.data?.error || 'Failed to save contact', type: 'error' });
    }
  };

  const filteredItems = contacts.filter(
    contact => contact.Title && contact.Title.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
       {
      name: 'Course Image',
      cell: row => (
        <img
          src={Array.isArray(row.images) ? row.images[0] : row.images}
          alt={row.Coursename}
          className="h-12 w-12 object-cover rounded"
        />
      ),
    },
    { name: 'Title', selector: row => row.Title, sortable: true },
    { name: 'Sub Title', selector: row => row.subTitle, sortable: true },
    {
      name: 'Date',
      selector: row => new Date(row.StartDate).toLocaleDateString() + ' ' + row.Time,
      sortable: true
    },
    { name: 'Location', selector: row => row.Location },
    { name: 'Cost', selector: row => row.Cost },
    { name: 'Slots', selector: row => row.Slot },
    {
      name: 'Actions',
      cell: row => (
        <>
          <button onClick={() => handleEdit(row)} className="text-blue-600 mr-3">Edit</button>
          <button onClick={() => handleDelete(row._id)} className="text-red-600">Delete</button>
        </>
      )
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Event Manager</h1>

      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
       

        <input
          type="text"
          placeholder="Search by Title..."
          className="border p-2 rounded"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
      </div>

      {isFormOpen && (
        <ContactForm 
          initialData={editingContact} 
          onSubmit={handleSubmit} 
          onCancel={handleFormClose} 
        />
      )}

      <DataTable
        columns={columns}
        data={filteredItems}
        progressPending={isLoading}
        pagination
        highlightOnHover
        dense
      />
    </div>
  );
};

export default Eventdisplay;
