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

// hello


export const {
  useDeleteSingleTaskMutation,
  useGetBoardByTeamIdQuery,
  useCreateBoardMutation
} = boardApi;