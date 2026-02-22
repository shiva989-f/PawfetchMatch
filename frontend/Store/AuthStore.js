import { errorMessage, successMessage } from "@/utils/HandleToast";
import axios from "axios";
import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: false,
  user: null,

  signup: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      successMessage(res.data.msg);
      set({ isLoading: false, user: res.data.user });
      return res.data;
    } catch (error) {
      console.log(error);
      errorMessage(error);
      set({ isLoading: false });
    }
  },
}));
