// Redux/UrlSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add new URL
export const addUrl = createAsyncThunk('urls/addUrl', async (urlData) => {
  const response = await axios.post('http://localhost:8000/url/create', urlData);
  return response.data;
});

// Fetch all URLs
export const fetchAllUrls = createAsyncThunk(
  'urls/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/url/display');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUrlById = createAsyncThunk(
  'urls/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/url/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete URL
export const deleteUrl = createAsyncThunk(
  'urls/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/url/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const urlSlice = createSlice({
  name: 'urls',
  initialState: {
    items: [],
    selectedUrl: null,
    status: 'idle',
    loading: false,
    error: null
  },
  reducers: {
    // ✅ Add this reducer
    clearSelectedUrl: (state) => {
      state.selectedUrl = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Add URL
      .addCase(addUrl.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUrl.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addUrl.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch all URLs
      .addCase(fetchAllUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch URL by ID
      .addCase(fetchUrlById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUrlById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUrl = action.payload;
      })
      .addCase(fetchUrlById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete URL
      .addCase(deleteUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(url => url._id !== action.payload);
        if (state.selectedUrl && state.selectedUrl._id === action.payload) {
          state.selectedUrl = null;
        }
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSelectedUrl } = urlSlice.actions;

export default urlSlice.reducer;
