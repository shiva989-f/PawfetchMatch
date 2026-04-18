import { errorMessage, successMessage } from "@/utils/HandleToast";
import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export const useUserActions = create((set) => ({
  isLoading: false,

  createPost: async (formData) => {
    set({ isLoading: true });

    try {
      const res = await axios.post(`${API_URL}/user/create-post`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ isLoading: false });
      successMessage(res.data.message);
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  updatePost: async ({ formData, postId }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(
        `${API_URL}/user/update-post/${postId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      set({ isLoading: false });
      successMessage(res.data.message);
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  deletePost: async ({ postId }) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${API_URL}/user/delete-post/${postId}`);
      set({ isLoading: false });
      successMessage(res.data.message);
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

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
      return res.data.post;
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

  reportPost: async ({ targetId, reason, description }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${API_URL}/user/report-post`, {
        targetId,
        reason,
        description,
      });
      set({ isLoading: false });
      successMessage(res.data.message);
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  getAllNotifications: async ({ receiverId }) => {
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

  getNotification: async ({ notificationId }) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(
        `${API_URL}/user/notification/${notificationId}`,
      );
      set({ selectedNotification: res.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  showUserPosts: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${API_URL}/user/show-user-post`);
      set({ userPosts: res.data.posts, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  chatbot: async ({ message }) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${API_URL}/user/chatbot`, { message });
      set({ reply: res.data.reply, isLoading: false });
      return res.data.reply;
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },
}));
