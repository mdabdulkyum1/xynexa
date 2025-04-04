import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ['Team', 'User'],
  baseQuery: fetchBaseQuery({ baseUrl:'http://localhost:5000/api'}),   
  endpoints: () => ({}),
});
