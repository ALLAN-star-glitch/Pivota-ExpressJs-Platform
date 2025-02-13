import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  plan: string;
  roles: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  userRoles: string[];
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRoles: ['user'],
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.isAuthenticated = true;
      state.userRoles = ['user', ...action.payload.user.roles]; 
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRoles = ['user'];
      state.user = null;
    },
  },
});

export const { setUser, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
