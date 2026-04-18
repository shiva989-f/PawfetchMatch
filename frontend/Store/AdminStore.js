import { create } from "zustand";
import axios from "axios";
import { errorMessage, successMessage } from "@/utils/HandleToast";
const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export const useAdminStore = create((set) => ({
  isLoading: false,
  posts: [],
  reportedPosts: [],
  users: [],
  totalPages: 0,

  showAllPosts: async (page = 1, limit = 10) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(
        `${API_URL}/admin/show-all-posts?page=${page}&limit=${limit}`,
      );

      set({
        posts: res.data.posts,
        totalPages: res.data.totalPage,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  showAllUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${API_URL}/admin/show-all-users`);

      set({
        users: res.data.users,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  showReportedPosts: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${API_URL}/admin/reported-posts`);

      set({
        reportedPosts: res.data.posts,
        totalPage: res.data.totalPage,
        totalPosts: res.data.totalPosts,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  managePostStatus: async (postId, postStatus) => {
    set({ isLoading: true });

    try {
      const res = await axios.post(`${API_URL}/admin/manage-post`, {
        postId,
        postStatus,
      });

      set({ isLoading: false });

      successMessage(res.data.message);
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  manageUserStatus: async (userId, accountStatus) => {
    set({ isLoading: true });

    try {
      const res = await axios.post(`${API_URL}/admin/manage-user`, {
        userId,
        accountStatus,
      });

      set({ isLoading: false });

      successMessage(res.data.message);
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },

  manageReportStatus: async (reportId, reportStatus) => {
    set({ isLoading: true });

    try {
      const res = await axios.post(`${API_URL}/admin/change-report-status`, {
        reportId,
        reportStatus,
      });

      set({ isLoading: false });

      successMessage(res.data.message);
    } catch (error) {
      set({ isLoading: false });
      errorMessage(error.response?.data?.message);
    }
  },
}));
