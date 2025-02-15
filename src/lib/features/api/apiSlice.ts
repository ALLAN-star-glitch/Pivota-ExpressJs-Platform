import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base API slice
export const api = createApi({
  reducerPath: "api", // This is the key under which the API slice will be stored in Redux
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, // Use your backend API URL
    credentials: "include", // Allows sending cookies (important for authentication)
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/auth/getUser",
        method: "GET"
      }),
    }),
  }),
});

// Export the hooks for the endpoints
export const { useLoginUserMutation, useGetUserQuery } = api;
