import { errorMessage } from "@/utils/HandleToast";
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
}));
