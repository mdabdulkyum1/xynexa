import { baseApi } from "./baseApi";

export const boardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new board
        createBoard: builder.mutation({
            query: (boardData) => ({
                url: "/boards/create",
                method: "POST",
                body: boardData,
            }),
            invalidatesTags: ["Board"],
        }),

        // Get all boards by teamId (you can extend this for memberEmail)
        getBoardsByTeamId: builder.query({
            query: (teamId) => `/boards/getAllTask?teamId=${teamId}`,
            providesTags: ["Board"],
        }),

      

    }),
});

export const {
    useCreateBoardMutation,
    useGetBoardsByTeamIdQuery,
} = boardApi;
