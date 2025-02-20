import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ApiError {
  status: number;
  data?: { message?: string };
}

// Define the base API slice
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include", // Ensures cookies (access token) are sent
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    refreshToken: builder.mutation({
      query: () => {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token found");

        return {
          url: "/auth/refresh",
          method: "POST",
          body: { refresh_token: refreshToken },
          credentials: "include",
        };
      },
    }),
    logoutUser: builder.mutation({
      query: () => {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token found");

        return {
          url: "/auth/logout",
          method: "POST",
          body: { refresh_token: refreshToken },
          credentials: "include",
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("refresh_token"); // Clear refresh token on success
        } catch (error) {
          console.error("Logout failed", error);
        }
      },
    }),
  }),
});

// Export hooks for API endpoints
export const { useLoginUserMutation, useLogoutUserMutation, useRefreshTokenMutation } = api;
