import { create } from 'zustand';
import api from '../lib/axios';

const useTeamStore = create((set, get) => ({
    teams: [],
    groupChats: [],
    currentTeam: null,
    isLoading: false,
    error: null,

    fetchUserTeamsByEmail: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/teams/user/teams/email/${email}`);
            set({ teams: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchTeamById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/teams/${id}`);
            set({ currentTeam: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchTeamsForGroupChat: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/teams/get-teams-by-email/${email}`);
            set({ groupChats: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    createTeam: async (teamData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/teams/create', teamData);
            set((state) => ({
                teams: [...state.teams, response.data],
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    addMemberToTeam: async (memberData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/teams/addMember', memberData);
            // Update the team in the list
            set((state) => ({
                teams: state.teams.map((t) => (t.id === response.data.team.id ? response.data.team : t)),
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    updateTeam: async (id, teamData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.put(`/teams/${id}`, teamData);
            set((state) => ({
                teams: state.teams.map((t) => (t.id === id ? response.data : t)),
                currentTeam: state.currentTeam?.id === id ? response.data : state.currentTeam,
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    deleteTeam: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await api.delete(`/teams/${id}`);
            set((state) => ({
                teams: state.teams.filter((t) => t.id !== id),
                currentTeam: state.currentTeam?.id === id ? null : state.currentTeam,
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    setCurrentTeam: (team) => set({ currentTeam: team }),
}));

export default useTeamStore;
