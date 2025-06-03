import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import {
  fetchChooseItems,
  deleteChooseItem,
} from '../Choose/ChooseSlice'; // adjust path if needed

const ChooseDisplay = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(state => state.choose);

  useEffect(() => {
    dispatch(fetchChooseItems());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return;

    try {
      await dispatch(deleteChooseItem(id)).unwrap();
      toast.success('Item deleted successfully');
    } catch (err) {
      toast.error('Error deleting item');
      console.error('Error:', err);
    }
  };

  const columns = [
    {
      name: 'Title',
      selector: row => row.Title,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      wrap: true,
    },
    {
      name: 'Keywords',
      cell: row => (
        <div>
          {row.keywordone && <div>- {row.keywordone}</div>}
          {row.keywordtwo && <div>- {row.keywordtwo}</div>}
          {row.keywordthree && <div>- {row.keywordthree}</div>}
          {row.keywordfour && <div>- {row.keywordfour}</div>}
          {row.keywordfive && <div>- {row.keywordfive}</div>}
          {row.keywordsix && <div>- {row.keywordsix}</div>}
        </div>
      ),
    },
    {
      name: 'Images',
      cell: row => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {row.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${row.Title}-${i}`}
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'cover',
                margin: '3px',
                borderRadius: '4px'
              }}
            />
          ))}
        </div>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <button
          onClick={() => handleDelete(row._id)}
          style={{
            padding: '6px 10px',
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Why Choose Us Items</h1>
      <DataTable
        columns={columns}
        data={items}
        pagination
        highlightOnHover
        striped
        responsive
        persistTableHead
      />
    </div>
  );
};

export default ChooseDisplay;
