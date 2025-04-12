import { baseApi } from './baseApi';

export const boardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBoard: builder.mutation({
      query: (boardData) => ({
        url: '/boards/create',
        method: 'POST',
        body: boardData,
      }),
      invalidatesTags: ['Board'],
    }),
    getBoardById: builder.query({
      query: (boardId) => `/${boardId}`,
      providesTags: (result, error, id) => [{ type: 'Board', id }], 
    }),
    updateBoard: builder.mutation({
      query: ({ boardId, boardData }) => ({
        url: `/boards/${boardId}`,
        method: 'PUT',
        body: boardData,
      }),
      invalidatesTags: ['Board'],
    }),
    deleteBoard: builder.mutation({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),
    addMemberToBoard: builder.mutation({
      query: (memberData) => ({
        url: '/boards/members',
        method: 'POST',
        body: memberData,
      }),
      invalidatesTags: ['Board'],
    }),
    addCommentToBoard: builder.mutation({
      query: (commentData) => ({
        url: '/boards/comments',
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: (result, error, { boardId }) => [{ type: 'Board', id: boardId }],
    }),
    updateBoardStatus: builder.mutation({
      query: (statusData) => ({
        url: '/boards/status',
        method: 'PUT',
        body: statusData,
      }),
      invalidatesTags: ['Board'],
    }),
    addAttachmentToBoard: builder.mutation({
      query: (attachmentData) => ({
        url: '/boards/attachments',
        method: 'POST',
        body: attachmentData,
      }),
      invalidatesTags: ['Board'],
    }),
  }),
});



export const {
  useCreateBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useAddMemberToBoardMutation,
  useAddCommentToBoardMutation,
  useUpdateBoardStatusMutation,
  useAddAttachmentToBoardMutation,
} = boardApi;