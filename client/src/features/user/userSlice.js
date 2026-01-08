import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,          // null when not logged in
  isAuthenticated: false,
  authChecked: false,  // very important for protected routes
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.authChecked = true;
    },

    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.authChecked = true;
    },

    updateUser: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },

    setAuthChecked: (state) => {
      state.authChecked = true;
    },
  },
});

export const {
  setUser,
  logoutUser,
  updateUser,
  setAuthChecked,
} = userSlice.actions;

export default userSlice.reducer;
