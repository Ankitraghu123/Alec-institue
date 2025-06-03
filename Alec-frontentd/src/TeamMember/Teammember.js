// // Redux/memberSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Add new member
// export const addMember = createAsyncThunk('members/addMember', async (formData, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('http://localhost:8000/member/create', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });

// // Fetch all members
// export const fetchAllMembers = createAsyncThunk('members/fetchAll', async (_, { rejectWithValue }) => {
//   try {
//     const response = await axios.get('http://localhost:8000/member/display');
//     return response.data.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
//   }
// });

// export const fetchMembers = createAsyncThunk(
//   'member/fetchMembers',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`http://localhost:8000/member/display`)
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message)
//     }
//   }
// )

// // Delete member thunk
// export const deleteMember = createAsyncThunk(
//   'member/deleteMember',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`http://localhost:8000/member/${id}`)
//       return id
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message)
//     }
//   }
// )

// const memberSlice = createSlice({
//   name: 'members',
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Add Member
//       .addCase(addMember.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addMember.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items.push(action.payload.data);
//       })
//       .addCase(addMember.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch All Members
//       .addCase(fetchAllMembers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllMembers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchAllMembers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchMembers.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchMembers.fulfilled, (state, action) => {
//         state.loading = false
//         state.members = action.payload
//       })
//       .addCase(fetchMembers.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload || 'Failed to fetch members'
//       })

//       // deleteMember
//       .addCase(deleteMember.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(deleteMember.fulfilled, (state, action) => {
//         state.loading = false
//         state.members = state.members.filter(member => member._id !== action.payload)
//       })
//       .addCase(deleteMember.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload || 'Failed to delete member'
//       })
//   },
// });

// export default memberSlice.reducer;



// Redux/memberSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add member
export const addMember = createAsyncThunk('member/addMember', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8000/member/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Fetch all members
export const fetchMembers = createAsyncThunk('member/fetchMembers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8000/member/display');
    // console.log(response)
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Delete member
export const deleteMember = createAsyncThunk('member/deleteMember', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:8000/member/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    members: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Member
      .addCase(addMember.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.members.push(action.payload.data);
      })
      .addCase(addMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Members
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch members';
      })

      // Delete Member
      .addCase(deleteMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = state.members.filter((member) => member._id !== action.payload);
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete member';
      });
  },
});

export const { resetState } = memberSlice.actions;

export default memberSlice.reducer;
