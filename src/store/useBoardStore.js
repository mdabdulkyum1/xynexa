import { create } from 'zustand';
import api from '../lib/axios';

const useBoardStore = create((set, get) => ({
    boards: [],
    currentBoard: null,
    isLoading: false,
    error: null,

    fetchBoardsByEmail: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/boards/task/email/${email}`);
            set({ boards: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchBoardsByTeamId: async (teamId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/boards/team/${teamId}`);
            set({ boards: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchBoardById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/boards/${id}`);
            set({ currentBoard: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    createBoard: async (boardData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/boards/create', boardData);
            set((state) => ({
                boards: [...state.boards, response.data],
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    updateBoard: async (id, boardData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.put(`/boards/${id}`, boardData);
            set((state) => ({
                boards: state.boards.map((b) => (b.id === id ? response.data : b)),
                currentBoard: state.currentBoard?.id === id ? response.data : state.currentBoard,
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    deleteBoard: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await api.delete(`/boards/${id}`);
            set((state) => ({
                boards: state.boards.filter((b) => b.id !== id),
                currentBoard: state.currentBoard?.id === id ? null : state.currentBoard,
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    userSummary: null,

    fetchUserFullSummary: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/boards/task/user/full-summary/${email}`);
            set({ userSummary: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    updateBoardStatus: async (boardId, status) => {
        try {
            const response = await api.put(`/boards/${boardId}/status`, { status });
            set((state) => ({
                boards: state.boards.map((b) => (b.id === boardId ? response.data : b)),
                currentBoard: state.currentBoard?.id === boardId ? response.data : state.currentBoard,
            }));
        } catch (error) {
            set({ error: error.message });
        }
    },

    deleteBoardTask: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await api.delete(`/boards/${id}`);
            set((state) => ({
                boards: state.boards.filter((b) => b.id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    addMemberToBoard: async (memberData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/boards/members', memberData);
            set((state) => ({
                currentBoard: state.currentBoard ? { ...state.currentBoard, members: [...(state.currentBoard.members || []), response.data] } : state.currentBoard,
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    addCommentToBoard: async (commentData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/boards/comments', commentData);
            set((state) => ({
                currentBoard: state.currentBoard ? { ...state.currentBoard, comments: [...(state.currentBoard.comments || []), response.data] } : state.currentBoard,
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    addAttachmentToBoard: async (attachmentData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/boards/attachments', attachmentData);
            set((state) => ({
                currentBoard: state.currentBoard ? { ...state.currentBoard, attachments: [...(state.currentBoard.attachments || []), response.data] } : state.currentBoard,
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },
}));

export default useBoardStore;
