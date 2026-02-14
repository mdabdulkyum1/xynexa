import { create } from 'zustand';
import api from '../lib/axios';

const useChatStore = create((set, get) => ({
    messages: [],
    groupMessages: [],
    currentChatPartner: null,
    currentGroup: null,
    isLoading: false,
    error: null,

    fetchUserMessages: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            // In xynexa-nest, it might be /messages/:userId
            const response = await api.get(`/messages/${userId}`);
            set({ messages: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchGroupMessages: async (groupId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/group-messages/${groupId}`);
            set({ groupMessages: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        try {
            // Standardize to 'content' for backend
            const payload = {
                senderId: messageData.senderId,
                receiverId: messageData.receiverId,
                content: messageData.text // Map from frontend 'text' if needed, but better to fix both
            };
            const response = await api.post('/messages', payload);
            set((state) => ({
                messages: [...state.messages, response.data],
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message });
            throw error;
        }
    },

    sendGroupMessage: async (groupId, messageData) => {
        try {
            // Standardize to 'content' for backend
            const payload = {
                senderId: messageData.senderId,
                groupId: groupId,
                content: messageData.message || messageData.content
            };
            const response = await api.post('/group-messages', payload);
            set((state) => ({
                groupMessages: [...state.groupMessages, response.data],
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message });
            throw error;
        }
    },

    setMessages: (messages) => set({ messages }),
    setGroupMessages: (messages) => set({ groupMessages: messages }),
    setCurrentChatPartner: (partner) => set({
        currentChatPartner: partner,
        currentGroup: null,
        messages: [] // Optional: clear messages when switching
    }),
    setCurrentGroup: (group) => set({
        currentGroup: group,
        currentChatPartner: null,
        groupMessages: [] // Optional: clear messages when switching
    }),

    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
    })),

    addGroupMessage: (message) => set((state) => ({
        groupMessages: [...state.groupMessages, message]
    })),
}));

export default useChatStore;
