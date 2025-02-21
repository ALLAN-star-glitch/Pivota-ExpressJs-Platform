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

const initialState: AuthState = {
  isAuthenticated: false,
  userRoles: [],
  user: null,
  refresh_token: null,
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
      state.refresh_token = action.payload.refresh_token;

      if (typeof window !== "undefined") {
        localStorage.setItem("authState", JSON.stringify(state)); // ✅ Only run in the browser
      }
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
      state.refresh_token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("authState"); // ✅ Only clear in the browser
      }
    },
  },
});

export const { setUser, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
