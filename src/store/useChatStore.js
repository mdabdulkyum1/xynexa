import { create } from 'zustand';
import api from '../lib/axios';

const useChatStore = create((set, get) => ({
    messages: [],
    groupMessages: [],
    currentChatPartner: null,
    currentGroup: null,
    isLoading: false,
    error: null,

    fetchUserMessages: async (receiverId, myId) => {
        set({ isLoading: true, error: null });
        try {
            // Updated to pass senderId (myId) in query
            const response = await api.get(`/messages/${receiverId}?senderId=${myId}`);
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
                content: messageData.content || messageData.text, // Accept both for compatibility
                read: false // Explicitly add read
            };
            console.log("Store: Sending message payload:", JSON.stringify(payload, null, 2));

            if (!payload.senderId || !payload.receiverId || !payload.content) {
                console.error("Store: Missing required fields:", payload);
                throw new Error("Missing required fields");
            }

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
    setCurrentChatPartner: (partner) => set((state) => {
        const partnerId = partner?._id || partner?.id;
        const currentId = state.currentChatPartner?._id || state.currentChatPartner?.id;

        // If clicking the same user, do nothing (preserves messages)
        if (partnerId && currentId && partnerId === currentId) {
            return state;
        }

        return {
            currentChatPartner: partner,
            currentGroup: null,
            messages: [] // Only clear if switching to a NEW partner
        };
    }),
    setCurrentGroup: (group) => set({
        currentGroup: group,
        currentChatPartner: null,
        groupMessages: [] // Optional: clear messages when switching
    }),

    addMessage: (message) => set((state) => {
        // Prevent duplicates
        if (state.messages.some(m => m._id === message._id)) {
            return state;
        }
        return { messages: [...state.messages, message] };
    }),

    addGroupMessage: (message) => set((state) => ({
        groupMessages: [...state.groupMessages, message]
    })),
}));

export default useChatStore;
