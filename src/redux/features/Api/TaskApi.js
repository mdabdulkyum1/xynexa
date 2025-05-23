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
    // get all boards by team id
    getBoardByTeamId: builder.query({
      query: (TeamId) => `/boards/team/${TeamId}`,
      providesTags: ['Board'],
    }),
    updateBoard: builder.mutation({
      query: ({ boardId, boardData }) => ({
        url: `/boards/${boardId}`,
        method: 'PUT',
        body: boardData,
      }),
      invalidatesTags: ['Board'],
    }),
    deleteSingleTask: builder.mutation({
      query: (id) => ({
        url: `/boards/${id}`,
        method: "DELETE",
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
      invalidatesTags: ['Board'],
    }),
    updateBoardStatus: builder.mutation({
      query: ({ boardId, status }) => ({
        url: `/boards/${boardId}/status`,
        method: 'PUT',
        body: { status },
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
    getTaskByCurrentUserEmail: builder.query({
      query: (userEmail) => `boards/task/email/${userEmail}`,
      providesTags: ['Board'],
  }),
  getUserFullSummary: builder.query({
    query: (userEmail) => `/boards/task/user/full-summary/${userEmail}`,
    providesTags: ['Board'],
}),
  }),
});

// hello hay


export const {
  useDeleteSingleTaskMutation,
  useGetBoardByTeamIdQuery,
  useCreateBoardMutation,
  useAddCommentToBoardMutation,
  useAddAttachmentToBoardMutation,
  useUpdateBoardStatusMutation,
  useGetTaskByCurrentUserEmailQuery,
  useGetUserFullSummaryQuery
} = boardApi;