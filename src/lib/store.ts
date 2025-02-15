import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authslice";
import { api } from "./features/api/apiSlice"; // Import the API slice

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer, // Keeps auth slice
      [api.reducerPath]: api.reducer, // Adds RTK Query API reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware), // Adds RTK Query middleware
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
