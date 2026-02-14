import { create } from 'zustand';
import api from '../lib/axios';

const usePaymentStore = create((set, get) => ({
    payments: [],
    isLoading: false,
    error: null,

    fetchUserPayments: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/payments/${userId}`);
            set({ payments: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },

    createPayment: async (paymentData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/payments', paymentData);
            set((state) => ({
                payments: [...state.payments, response.data],
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    updatePayment: async (id, paymentData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.put(`/payments/${id}`, paymentData);
            set((state) => ({
                payments: state.payments.map((p) => (p._id === id ? response.data : p)),
                isLoading: false,
            }));
            return response.data;
        } catch (error) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },
}));

export default usePaymentStore;
