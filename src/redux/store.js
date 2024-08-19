import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userReducer";
import postsReducer from "./slices/postsReducer";

const preloadedState = localStorage.getItem("redux")
  ? JSON.parse(localStorage.getItem("redux"))
  : {};
export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
  // preloadedState,
});
store.subscribe(() => {
  localStorage.setItem("redux", JSON.stringify(store.getState()));
});
