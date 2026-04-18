import { errorMessage, successMessage } from "@/utils/HandleToast";
import axios from "axios";
import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: true,
  user: null,

  signup: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, formData);

      successMessage(res.data.message);
      set({ isLoading: false, user: res.data.user });
      return res.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      set({ isLoading: false });
    }
  },

  // Admin Signup
  adminSignup: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${API_URL}/auth/admin/signup`, formData);

      successMessage(res.data.message);
      set({ isLoading: false, user: res.data.user });
      return res.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      set({ isLoading: false });
    }
  },

  verifyEmail: async (otp) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${API_URL}/auth/verify-email`, otp);
      successMessage(res.data.message);
      set({
        isLoading: false,
        user: res.data.user,
        isAuthenticated: res.data.user.isVerified,
      });
      return res.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      set({ isLoading: false });
    }
  },

  login: async (loginData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${API_URL}/auth/login`, loginData);
      successMessage(res.data.message);
      set({
        isLoading: false,
        user: res.data.user,
        isAuthenticated: res.data.user.isVerified,
      });
      return res.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      set({ isLoading: false });
    }
  },
  updateUser: async ({ formData, id }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(
        `${API_URL}/auth/update-user/${id}`,
        formData,
      );
      successMessage(res.data.message);
      set({
        isLoading: false,
        user: res.data.user,
        isAuthenticated: res.data.user.isVerified,
      });
      return res.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${API_URL}/auth/logout`);
      successMessage(res.data.message);
      set({ isLoading: false, isAuthenticated: false, user: null });
    } catch (error) {
      errorMessage(error.response?.data?.message);
      set({ isLoading: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });
      successMessage(res.data.message);
      set({ isLoading: false });
    } catch (error) {
      errorMessage(error.response?.data?.message);
      set({ isLoading: false });
    }
  },

  resetPassword: async ({ resetToken, password }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${API_URL}/auth/reset-password`, {
        resetToken,
        password,
      });
      successMessage(res.data.message);
      set({
        isLoading: false,
        isAuthenticated: res.data.user.isVerified,
        user: res.data.user,
      });
      return res.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axios.get(`${API_URL}/auth/check-auth`);
      set({
        user: res.data.user,
        isAuthenticated: res.data.user.isVerified,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ isCheckingAuth: false, isAuthenticated: false });
    }
  },
}));
