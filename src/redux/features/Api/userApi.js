import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    getUserByEmail: builder.query({
      query: (email) => `/users/email/${email}`,
    }),
    getAllUsers: builder.query({
      query: () => `/users`,
    }),
  }),
});

export const { useGetUserByIdQuery, useGetUserByEmailQuery, useGetAllUsersQuery } = userApi;