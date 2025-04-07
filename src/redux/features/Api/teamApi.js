import { baseApi } from "./baseApi";

export const teamApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTeam: builder.query({
            query: (id) => `/teams/${id}`,
            providesTags: ['Team'],
        }),
        createTeam: builder.mutation({
            query: (teamData) => ({
                url: "/teams/create",
                method: "POST",
                body: teamData,
            }),
            invalidatesTags: ['Team'],
        }),
        updateTeam: builder.mutation({
            query: ({ id, ...teamData }) => ({
                url: `/teams/${id}`,
                method: "PUT",
                body: teamData,
            }),
            invalidatesTags: ['Team'],
        }),
        deleteTeam: builder.mutation({
            query: (id) => ({
                url: `/teams/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Team'],
        }),
        addMemberToTeam: builder.mutation({
            query: (memberData) => ({
                url: "/teams/addMember",
                method: "POST",
                body: memberData,
            }),
            invalidatesTags: ['Team'],
        }),
        getTeamsByCurrentUser: builder.query({
            query: (userId) => `/teams/user/teams/${userId}`,
            providesTags: ['Team'],
        }),
    }),
});

export const {
    useGetTeamQuery,
    useCreateTeamMutation,
    useUpdateTeamMutation,
    useDeleteTeamMutation,
    useAddMemberToTeamMutation,
    useGetTeamsByCurrentUserQuery,
} = teamApi;