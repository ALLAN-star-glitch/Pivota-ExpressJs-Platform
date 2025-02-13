import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authslice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authReducer, // Add the auth reducer here
      },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


