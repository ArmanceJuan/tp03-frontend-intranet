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
  tagTypes: ["User", "AllUsers", "RandomUsers", "Login", "UserData"],
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
    getRandomUser: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["User"],
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
        url: `/user/${id}/view`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/user/${id}/edit`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["UserData"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: "/user/add",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["UserData"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetRandomUserQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = apiSlice;
