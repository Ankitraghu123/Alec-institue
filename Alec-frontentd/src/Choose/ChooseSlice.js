import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create new "choose" item with images
export const createChoose = createAsyncThunk(
  'choose/createChoose',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/choose/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Something went wrong'
      );
    }
  }
);

// Fetch all choose items
export const fetchChooseItems = createAsyncThunk(
  'choose/fetchChooseItems',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8000/choose/display`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete a choose item
export const deleteChooseItem = createAsyncThunk(
  'choose/deleteChooseItem',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/choose/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const chooseSlice = createSlice({
  name: 'choose',
  initialState: {
    loading: false,
    error: null,
    success: false,
    data: null,
    items: [], // ✅ Added this to fix the issue with item list
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createChoose.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createChoose.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(createChoose.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create choose content';
        state.success = false;
      })

      // Fetch
      .addCase(fetchChooseItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChooseItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchChooseItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteChooseItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export const { resetState } = chooseSlice.actions;
export default chooseSlice.reducer;
