import { create } from 'zustand';
import api from '../lib/axios';

const useUserStore = create((set, get) => ({
    users: [],
    user: null,
    userStats: null,
    currentUserProfile: null,
    isLoading: false,
    error: null,

    fetchUserByEmail: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/users/email/${email}`);
            set({ user: response.data, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/users');
            set({ users: response.data.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchUserStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/users/stats');
            set({ userStats: response.data.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchUserProfile: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/users/${id}`);
            set({ currentUserProfile: response.data.data, isLoading: false });
            return response.data.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    updateUser: async (id, userData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.put(`/users/${id}`, userData);
            set((state) => ({
                users: state.users.map((u) => (u._id === id ? response.data.data : u)),
                currentUserProfile: state.currentUserProfile?._id === id ? response.data.data : state.currentUserProfile,
                isLoading: false,
            }));
            return response.data.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    deleteUser: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await api.delete(`/users/${id}`);
            set((state) => ({
                users: state.users.filter((u) => u._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useUserStore;
