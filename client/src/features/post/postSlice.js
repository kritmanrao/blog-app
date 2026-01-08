import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFavoritePosts,
  getMyPosts,
  getPublicPosts,
  getSearchPost,
} from "../../service/post";

/* ------------------ ASYNC THUNKS ------------------ */

export const fetchMyPosts = createAsyncThunk(
  "post/fetchMyPosts",
  async (signal, { rejectWithValue }) => {
    try {
      const res = await getMyPosts(signal);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchPublicPosts = createAsyncThunk(
  "post/fetchPublicPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPublicPosts();
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchFavoritePosts = createAsyncThunk(
  "post/fetchFavoritePosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getFavoritePosts();
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchSearchPosts = createAsyncThunk(
  "post/fetchSearchPosts",
  async (query, { rejectWithValue }) => {
    try {
      const res = await getSearchPost(query);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

/* ------------------ SLICE ------------------ */

const initialState = {
  isLoading: false,
  posts: [],
  publicPosts: [],
  favoritePosts: [],
  searchPosts: [],
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ---------- MY POSTS ---------- */
      .addCase(fetchMyPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* ---------- PUBLIC POSTS ---------- */
      .addCase(fetchPublicPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPublicPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicPosts = action.payload;
      })
      .addCase(fetchPublicPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* ---------- FAVORITE POSTS ---------- */
      .addCase(fetchFavoritePosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavoritePosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoritePosts = action.payload;
      })
      .addCase(fetchFavoritePosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* ---------- SEARCH POSTS ---------- */
      .addCase(fetchSearchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchPosts = action.payload;
      })
      .addCase(fetchSearchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
