import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ['Team', 'User'],
  baseQuery: fetchBaseQuery({ baseUrl:`${process.env.NEXT_PUBLIC_SERVER_URL}/api`}),   
  endpoints: () => ({}),
});
