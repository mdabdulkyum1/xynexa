import { create } from 'zustand';
import api from '../lib/axios';

const useDocumentStore = create((set, get) => ({
    documents: [],
    currentDocument: null,
    isLoading: false,
    error: null,

    fetchDocumentsByEmail: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/documents`, { params: { email } });
            set({ documents: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchDocumentById: async (id) => {
        if (!id || id === 'undefined') {
            return null;
        }
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/documents/${id}`);
            set({ currentDocument: response.data, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    createDocument: async (docData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/documents', docData);
            set((state) => ({
                documents: [...state.documents, response.data],
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    updateDocument: async (id, docData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.put(`/documents/${id}`, docData);
            set((state) => ({
                documents: state.documents.map((d) => (d.id === id || d._id === id ? response.data : d)),
                currentDocument: state.currentDocument?.id === id || state.currentDocument?._id === id ? response.data : state.currentDocument,
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    deleteDocument: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await api.delete(`/documents/${id}`);
            set((state) => ({
                documents: state.documents.filter((d) => d.id !== id && d._id !== id),
                currentDocument: state.currentDocument?.id === id || state.currentDocument?._id === id ? null : state.currentDocument,
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    setCurrentDocument: (doc) => set({ currentDocument: doc }),
}));

export default useDocumentStore;
