import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";
import { apiSlice } from "./apiSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
