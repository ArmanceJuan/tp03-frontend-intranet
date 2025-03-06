import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Login"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStart(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.error("Logout failed:", err);
        }
      },
    }),
    getRandomUsers: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["RandomUsers"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["AllUsers"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}/view`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: (user) => ({
        url: `/users/${id}/edit`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllUsers"],
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: "/users/add",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["AllUsers"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetRandomUsersQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = apiSlice;
