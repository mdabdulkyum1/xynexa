import { create } from 'zustand';
import api from '../lib/axios';

const useMeetingStore = create((set, get) => ({
    meetings: [],
    isLoading: false,
    error: null,

    fetchMeetings: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('/hms');
            set({ meetings: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    createMeeting: async (meetingData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/hms', meetingData);
            set((state) => ({
                meetings: [...state.meetings, response.data],
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },
}));

export default useMeetingStore;
