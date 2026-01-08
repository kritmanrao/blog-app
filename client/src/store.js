import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/post/postSlice.js";
import userReducer from "./features/user/userSlice.js";

const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
