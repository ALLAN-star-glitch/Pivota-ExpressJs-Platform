import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  refresh_token: string | null; 
  loading: boolean;
  error: string | null;
  firstName: string;
  lastName: string;
  plan: string;
  id: string;
  phone: string;
}

// Load persisted state from localStorage
const storedAuth =
  typeof window !== "undefined" ? localStorage.getItem("authState") : null;

const initialState: AuthState = storedAuth
  ? JSON.parse(storedAuth)
  : {
      isAuthenticated: false,
      userRoles: [],
      user: null,
      refresh_token: null, // 🔹 Added this
      loading: false,
      error: null,
      firstName: "",
      lastName: "",
      plan: "",
      id: "",
      phone: "",
    };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser: (
      state,
      action: PayloadAction<{ user: User; refresh_token: string }>
    ) => {
      state.isAuthenticated = true;
      state.userRoles = action.payload.user.roles;
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.plan = action.payload.user.plan;
      state.phone = action.payload.user.phone;
      state.id = action.payload.user.id;
      state.user = action.payload.user;
      state.refresh_token = action.payload.refresh_token; // 🔹 Ensure refresh_token is stored

      // Persist state in localStorage
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRoles = [];
      state.user = null;
      state.firstName = "";
      state.lastName = "";
      state.plan = "";
      state.id = "";
      state.phone = "";
      state.refresh_token = null; // 🔹 Clear refresh_token on logout

      // Clear localStorage on logout
      localStorage.removeItem("authState");
    },
  },
});

export const { setUser, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
