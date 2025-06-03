// import React, { useEffect, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import DataTable from 'react-data-table-component';
// import { toast } from 'react-toastify';
// import { FiTrash2, FiEdit, FiImage } from 'react-icons/fi';
// import { fetchMembers, deleteMember, resetState } from '../TeamMember/Teammember';

// const TeamMemberDisplay = () => {
//   const dispatch = useDispatch();
//   const { members, loading, error } = useSelector((state) => state.members);

//   useEffect(() => {
//     dispatch(fetchMembers());
//     dispatch(resetState());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) toast.error(error);
//   }, [error]);

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this team member?')) {
//       dispatch(deleteMember(id))
//         .unwrap()
//         .then(() => toast.success('Team member deleted successfully'))
//         .catch(() => toast.error('Error deleting team member'));
//     }
//   };

//   const columns = useMemo(() => [
//     {
//       name: 'Member Name',
//       selector: row => row.Membername,
//       sortable: true,
//       cell: row => (
//         <div className="font-medium text-gray-900">
//           {row.Membername}
//         </div>
//       ),
//       minWidth: '150px',
//     },
//     {
//       name: 'Position',
//       selector: row => row.Teamposition,
//       sortable: true,
//       cell: row => (
//         <div className="text-gray-600">
//           {row.Teamposition}
//         </div>
//       ),
//       minWidth: '120px',
//     },
// {
//   name: 'Description',
//   selector: row => row.desciption,
//   sortable: true,
//   cell: row => (
//     <div className="text-gray-600">
//       {row.desciption}
//     </div>
//   ),
//   minWidth: '120px',
// },

//     {
//       name: 'Contact',
//       selector: row => row.email,
//       cell: row => (
//         <div className="space-y-1">
//           {row.email && (
//             <div className="text-sm text-gray-600">
//               <a href={`mailto:${row.email}`} className="hover:text-blue-600 hover:underline">
//                 {row.email}
//               </a>
//             </div>
//           )}
//           {row.phone && (
//             <div className="text-sm text-gray-600">
//               {row.phone}
//             </div>
//           )}
//           {row.address && (
//             <div className="text-sm text-gray-600">
//               {row.address}
//             </div>
//           )}
//         </div>
//       ),
//       minWidth: '200px',
//     },
//     {
//       name: 'Images',
//       cell: row => (
//         <div className="flex flex-wrap gap-1">
//           {row.images && row.images.length > 0 ? (
//             row.images.map((img, index) => (
//               <div key={index} className="relative group">
//                 <img
//                   src={img}
//                   alt={`${row.Membername}-${index}`}
//                   className="w-12 h-12 object-cover rounded border border-gray-200"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = 'https://via.placeholder.com/60';
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
//                   <a 
//                     href={img} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="text-white p-1 hover:text-blue-300"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <FiImage size={14} />
//                   </a>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400">
//               <FiImage size={18} />
//             </div>
//           )}
//         </div>
//       ),
//       ignoreRowClick: true,
//       minWidth: '150px',
//     },
//     {
//       name: 'Actions',
//       cell: row => (
//         <div className="flex space-x-2">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               // handleEdit(row._id);
//               toast.info('Edit functionality coming soon');
//             }}
//             className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
//             title="Edit"
//           >
//             <FiEdit size={18} />
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleDelete(row._id);
//             }}
//             className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
//             title="Delete"
//           >
//             <FiTrash2 size={18} />
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//       minWidth: '100px',
//     }
//   ], []);

//   const customStyles = {
//     headRow: {
//       style: {
//         backgroundColor: '#f9fafb',
//         fontWeight: '600',
//         fontSize: '0.75rem',
//         textTransform: 'uppercase',
//         letterSpacing: '0.05em',
//         borderTop: '1px solid #f3f4f6',
//       },
//     },
//     rows: {
//       style: {
//         minHeight: '72px',
//         '&:not(:last-of-type)': {
//           borderBottom: '1px solid #f3f4f6',
//         },
//         '&:hover': {
//           backgroundColor: '#f8fafc',
//         },
//       },
//     },
//     pagination: {
//       style: {
//         backgroundColor: '#f9fafb',
//         borderTop: '1px solid #f3f4f6',
//       },
//     },
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );

//   return (
//     <div className="p-4 md:p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
//         <div className="text-sm text-gray-500">
//           {members.length} {members.length === 1 ? 'member' : 'members'} total
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <DataTable
//           columns={columns}
//           data={members}
//           pagination
//           paginationPerPage={10}
//           paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
//           highlightOnHover
//           striped
//           responsive
//           persistTableHead
//           customStyles={customStyles}
//           noDataComponent={
//             <div className="p-8 text-center">
//               <div className="text-gray-400 mb-2">
//                 <FiImage size={48} className="mx-auto" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-700">No team members found</h3>
//               <p className="text-gray-500 mt-1">Add your first team member to get started</p>
//             </div>
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default TeamMemberDisplay;



import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import { FiTrash2, FiEdit, FiImage } from 'react-icons/fi';
import { fetchMembers, deleteMember, resetState } from '../TeamMember/Teammember';

const TeamMemberDisplay = () => {
  const dispatch = useDispatch();
  const { members, loading, error } = useSelector((state) => state.members);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      dispatch(deleteMember(id))
        .unwrap()
        .then(() => toast.success('Team member deleted successfully'))
        .catch(() => toast.error('Error deleting team member'));
    }
  };

  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      member.Membername?.toLowerCase().includes(filterText.toLowerCase()) ||
      member.Teamposition?.toLowerCase().includes(filterText.toLowerCase()) ||
      member.email?.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, members]);

  const columns = useMemo(() => [
    {
      name: 'Member Name',
      selector: row => row.Membername,
      sortable: true,
      cell: row => (
        <div className="font-medium text-gray-900">
          {row.Membername}
        </div>
      ),
      minWidth: '150px',
    },
    {
      name: 'Position',
      selector: row => row.Teamposition,
      sortable: true,
      cell: row => (
        <div className="text-gray-600">
          {row.Teamposition}
        </div>
      ),
      minWidth: '120px',
    },
    {
      name: 'Description',
      selector: row => row.desciption,
      sortable: true,
      cell: row => (
        <div className="text-gray-600">
          {row.desciption}
        </div>
      ),
      minWidth: '120px',
    },
    {
      name: 'Contact',
      selector: row => row.email,
      cell: row => (
        <div className="space-y-1">
          {row.email && (
            <div className="text-sm text-gray-600">
              <a href={`mailto:${row.email}`} className="hover:text-blue-600 hover:underline">
                {row.email}
              </a>
            </div>
          )}
          {row.phone && (
            <div className="text-sm text-gray-600">
              {row.phone}
            </div>
          )}
          {row.address && (
            <div className="text-sm text-gray-600">
              {row.address}
            </div>
          )}
        </div>
      ),
      minWidth: '200px',
    },
    {
      name: 'Images',
      cell: row => (
        <div className="flex flex-wrap gap-1">
          {row.images && row.images.length > 0 ? (
            row.images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt={`${row.Membername}-${index}`}
                  className="w-12 h-12 object-cover rounded border border-gray-200"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/60';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <a
                    href={img}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white p-1 hover:text-blue-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiImage size={14} />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400">
              <FiImage size={18} />
            </div>
          )}
        </div>
      ),
      ignoreRowClick: true,
      minWidth: '150px',
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.info('Edit functionality coming soon');
            }}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
            title="Edit"
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id);
            }}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      minWidth: '100px',
    }
  ], []);

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f9fafb',
        fontWeight: '600',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderTop: '1px solid #f3f4f6',
      },
    },
    rows: {
      style: {
        minHeight: '72px',
        '&:not(:last-of-type)': {
          borderBottom: '1px solid #f3f4f6',
        },
        '&:hover': {
          backgroundColor: '#f8fafc',
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #f3f4f6',
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
        <div className="text-sm text-gray-500">
          {members.length} {members.length === 1 ? 'member' : 'members'} total
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, position or email..."
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredMembers}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
          highlightOnHover
          striped
          responsive
          persistTableHead
          customStyles={customStyles}
          noDataComponent={
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <FiImage size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">No team members found</h3>
              <p className="text-gray-500 mt-1">Add your first team member to get started</p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default TeamMemberDisplay;
