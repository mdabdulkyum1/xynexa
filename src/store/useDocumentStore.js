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
            const response = await api.get(`/documents/getAllDoc`, { params: { email } });
            set({ documents: response.data.documents, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchDocumentById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/documents/document/${id}`);
            set({ currentDocument: response.data, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    createDocument: async (docData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/documents/create', docData);
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
            const response = await api.put(`/documents/update/${id}`, docData);
            set((state) => ({
                documents: state.documents.map((d) => (d._id === id ? response.data : d)),
                currentDocument: state.currentDocument?._id === id ? response.data : state.currentDocument,
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
            await api.delete(`/documents/delete/${id}`);
            set((state) => ({
                documents: state.documents.filter((d) => d._id !== id),
                currentDocument: state.currentDocument?._id === id ? null : state.currentDocument,
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    setCurrentDocument: (doc) => set({ currentDocument: doc }),
}));

export default useDocumentStore;
