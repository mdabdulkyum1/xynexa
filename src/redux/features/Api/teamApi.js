import { baseApi } from "./baseApi";

export const teamApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // single team get
        getTeam: builder.query({
            query: (id) => `/teams/${id}`,
            providesTags: ['Team'],
        }),
        // create team
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
        // Get user's teams by email
        getTeamsByCurrentUserEmail: builder.query({
            query: (userEmail) => `/teams/user/teams/email/${userEmail}`,
            providesTags: ['Team'],
        }),
        getTeamsByEmailForGroupChat: builder.query({
            query: (userEmail) => `/teams/get-teams-by-email/${userEmail}`,
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
    useGetTeamsByCurrentUserEmailQuery,
    useGetTeamsByEmailForGroupChatQuery, 
} = teamApi;