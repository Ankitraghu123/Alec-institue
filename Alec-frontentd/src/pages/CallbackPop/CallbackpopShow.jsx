import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const CallbackpopShow = () => {
  const [callbackData, setCallbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  const api = "https://alec-institue.onrender.com/Callback/allcallback";

  useEffect(() => {
    fetchCallbackData();
  }, []);

  const fetchCallbackData = () => {
    setLoading(true);
    axios
      .get(api)
      .then((res) => {
        console.log("Callback API Response:", res.data);
        const actualData = Array.isArray(res.data) ? res.data : res.data.data || [];
        setCallbackData(actualData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching callback data:", error);
        setLoading(false);
      });
  };

  // Delete handler function
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this callback entry?")) {
      axios
        .delete(`https://alec-institue.onrender.com/Callback/allcallback/${id}`)
        .then(() => {
          // Remove deleted item from state to update UI
          setCallbackData(callbackData.filter((item) => item._id !== id));
          alert("Deleted successfully!");
        })
        .catch((error) => {
          console.error("Failed to delete:", error);
          alert("Failed to delete the callback entry.");
        });
    }
  };

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.name || "N/A",
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone || "N/A",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleDelete(row._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">📋 Callback Request List</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable
          title="All Callback Entries"
          columns={columns}
          data={callbackData}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
          responsive
          persistTableHead
          noDataComponent="No callback data found"
        />
      </div>
    </div>
  );
};

export default CallbackpopShow;
