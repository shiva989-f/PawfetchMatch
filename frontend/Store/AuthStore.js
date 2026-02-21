import axios from "axios";
import { create } from "zustand";

const API_URL = import.meta.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: false,
  user: null,

  signup: async (formData) => {},
}));
