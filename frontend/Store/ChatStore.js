import { errorMessage, successMessage } from "@/utils/HandleToast";
import axios from "axios";
import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
axios.defaults.withCredentials = true;

export const useChatStore = create((set, get) => ({
  isLoading: false,
  chats: [],
  fetchedMessages: [],
  currentChat: null,

  createChat: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(`${API_URL}/chat/create-chat`, data);

      set({
        isLoading: false,
        currentChat: res.data.chat,
      });

      return res.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      set({ isLoading: false });
    }
  },

  getChatList: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${API_URL}/chat/chat-lists`);

      set({
        chats: res.data.chats,
        isLoading: false,
      });

      return res.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      set({ isLoading: false });
    }
  },

  getMessages: async (chatId) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${API_URL}/chat/messages/${chatId}`);

      set({
        fetchedMessages: res.data.messages,
        currentChat: chatId,
        isLoading: false,
      });

      return res.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      set({ isLoading: false });
    }
  },

  sendMessage: async ({ chatId, text, files }) => {
    try {
      const formData = new FormData();
      formData.append("chatId", chatId);
      if (text) formData.append("text", text);

      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append("files", file);
        });
      }

      const res = await axios.post(`${API_URL}/chat/send-message`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set({
        fetchedMessages: [...get().fetchedMessages, res.data.data],
      });

      return res.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
    }
  },

  getLatestMessages: async (chatId) => {
    try {
      const fetchedMessages = get().fetchedMessages;

      const lastMessageTime =
        fetchedMessages.length > 0
          ? fetchedMessages[fetchedMessages.length - 1].createdAt
          : new Date().toISOString();
      console.log(lastMessageTime);

      const res = await axios.get(
        `${API_URL}/chat/messages/${chatId}?lastTime=${lastMessageTime}`,
      );

      if (res.data.messages.length > 0) {
        const newMessages = res.data.messages.filter(
          (msg) => !fetchedMessages.some((m) => m._id === msg._id),
        );

        set({
          fetchedMessages: [...fetchedMessages, ...newMessages],
        });
      }

      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  markAsSeen: async (chatId) => {
    try {
      await axios.get(`${API_URL}/chat/messages/seen/${chatId}`);
    } catch (error) {
      console.log(error);
    }
  },
}));
