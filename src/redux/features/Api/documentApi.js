import { baseApi } from "./baseApi";

export const documentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    documentCreate: builder.mutation({
      query: (saveDocument) => ({
        url: "/documents/create",
        method: "POST",
        body: saveDocument,
      }),
      invalidatesTags: ["Document"], 
    }),
    documentUpdate: builder.mutation({
      query: ({ id, updatedDocument }) => ({
        url: `/documents/update/${id}`,
        method: "PUT",
        body: updatedDocument,
      }),
      invalidatesTags: ["Document"]
    }),
    documentDelete: builder.mutation({
      query: (id) => ({
        url: `/documents/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Document"]
    }),
    documentGetById: builder.query({
      query: (id) => `/documents/document/${id}`,
      providesTags: ["Document"]
    }),
    documentGetByEmail: builder.query({
      query: (email) => `/documents/getAllDoc?email=${email}`,
      providesTags: ["Document"]
    }),
  }),
});

export const {
  useDocumentCreateMutation,
  useDocumentUpdateMutation,
  useDocumentDeleteMutation,
  useDocumentGetByIdQuery,
  useDocumentGetByEmailQuery,
} = documentApi;