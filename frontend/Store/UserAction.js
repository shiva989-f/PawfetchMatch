import { errorMessage, successMessage } from "@/utils/HandleToast";
import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export const useUserActions = create((set) => ({
  isLoading: false,

  getPetsData: async ({ page = 1, limit = 10 } = {}) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(
        `${API_URL}/user/pets?page=${page}&limit=${limit}`,
      );

      set({
        pets: res.data.posts,
        totalPages: res.data.totalPage,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  searchPets: async ({ query, page, limit }) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(
        `${API_URL}/user/search-post/?q=${query}&page=${page}&limit=${limit}`,
      );
      set({
        pets: res.data.posts,
        totalPages: res.data.totalPage,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  getPetData: async ({ id }) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${API_URL}/user/pet/${id}`);
      set({ pet: res.data.post, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  requestAdoption: async ({ postId }) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${API_URL}/user/request-adoption/${postId}`);
      set({ isLoading: false });
      successMessage(res.data.message);
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  getNotifications: async ({ receiverId }) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(
        `${API_URL}/user/notifications/${receiverId}`,
      );
      set({ notifications: res.data.notifications, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },
}));
