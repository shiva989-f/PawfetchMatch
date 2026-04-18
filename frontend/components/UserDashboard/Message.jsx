"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../../utils/Socket";
import { useAuthStore } from "@/Store/AuthStore";

const getInitials = (name) => {
  if (!name || typeof name !== "string") return "U";

  return name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const avatarColors = {
  1: "bg-green-100 text-green-800",
  2: "bg-blue-100 text-blue-800",
  3: "bg-pink-100 text-pink-800",
  4: "bg-orange-100 text-orange-800",
  5: "bg-purple-100 text-purple-800",
  6: "bg-indigo-100 text-indigo-800",
  7: "bg-teal-100 text-teal-800",
  8: "bg-stone-100 text-stone-800",
  9: "bg-rose-100 text-rose-800",
  10: "bg-emerald-100 text-emerald-800",
  11: "bg-sky-100 text-sky-800",
};

const Message = () => {
  const { user } = useAuthStore();
  const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL;

  const senderId = user?._id;

  const [contacts, setContacts] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const activeContact = contacts.find((c) => c._id === activeId) || {};

  // Socket Code
  useEffect(() => {
    if (!senderId) return;
    console.log(senderId);

    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("register_user", senderId);

    socket.on("online_users", (users) => {
      setContacts((prev) =>
        prev.map((c) => ({
          ...c,
          online: users.includes(c._id),
        })),
      );
    });

    socket.on("receive_message", (msg) => {
      const formatted = {
        id: Date.now(),
        text: msg.text,
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        incoming: msg.senderId !== senderId,
        status: msg.status,
        _id: msg._id,
      };

      setMessages((prev) => [...prev, formatted]);

      socket.emit("message_delivered", msg._id);
    });

    socket.on("message_sent", (msg) => {
      const formatted = {
        id: Date.now(),
        text: msg.text,
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        incoming: false,
        status: msg.status,
        _id: msg._id,
      };

      setMessages((prev) => [...prev, formatted]);
    });

    socket.on("message_status_update", (updatedMsg) => {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === updatedMsg._id ? { ...m, status: updatedMsg.status } : m,
        ),
      );
    });

    socket.on("messages_seen", () => {
      setMessages((prev) =>
        prev.map((m) =>
          m.senderId === senderId ? { ...m, status: "seen" } : m,
        ),
      );
    });

    return () => {
      socket.off("receive_message");
      socket.off("message_sent");
      socket.off("message_status_update");
      socket.off("messages_seen");
      socket.off("online_users");
    };
  }, [senderId]);

  // Load chats
  useEffect(() => {
    if (!senderId) return;

    const loadChats = async () => {
      try {
        const res = await axios.get(`${API_BASE}/chat-list/${senderId}`);

        // map backend data to your UI format
        const formatted = res.data.messages.map((c, index) => ({
          id: index + 1,
          _id: c._id,
          name: c.username || c._id || "User",
          preview: c.lastMessage || "Start chat",
          time: new Date(c.lastTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setContacts(formatted);

        if (formatted.length > 0) {
          setActiveId(formatted[0]._id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadChats();
  }, [senderId]);

  // Load Messages
  useEffect(() => {
    if (!activeId || !senderId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/messages/${senderId}/${activeId}`,
        );

        const formatted = res.data.map((m, i) => ({
          id: i + 1,
          text: m.text,
          time: new Date(m.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          incoming: m.senderId !== senderId,
          status: m.status,
          _id: m._id,
        }));

        setMessages(formatted);

        socket.emit("join_chat", {
          senderId,
          receiverId: activeId,
        });

        socket.emit("message_seen", {
          senderId: activeId,
          receiverId: senderId,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [activeId]);

  // Handle Send Button
  const handleSend = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      senderId,
      receiverId: activeId,
      text: message,
    });

    setMessage("");
  };

  return (
    <div className="flex h-screen bg-white border border-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 min-w-[288px] flex flex-col border-r border-gray-100">
        {/* Header */}
        <div className="px-4 pt-5 pb-3">
          <h2 className="text-xl font-medium text-gray-900 mb-3">Messages</h2>
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 16 16"
            >
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l3 3" />
            </svg>
            <input
              className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="px-4 pb-1 text-xs text-gray-500 flex items-center gap-1">
          Sort by{" "}
          <span className="text-green-500 font-medium cursor-pointer">
            Newest ↓
          </span>
        </div>

        {/* Contact list */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              onClick={() => setActiveId(contact._id)}
              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                activeId === contact.id ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium ${avatarColors[contact.id] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {getInitials(contact.name || "User")}
                </div>
                {contact.online && (
                  <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-sm font-medium text-gray-900 truncate">
                  {contact.pinned && (
                    <span className="text-gray-400 text-xs">📌</span>
                  )}
                  {contact.name}
                </div>
                <div
                  className={`text-xs truncate mt-0.5 ${contact.typing ? "text-green-500 italic" : "text-gray-500"}`}
                >
                  {contact.preview}
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[11px] text-gray-400">
                  {contact.time}
                </span>
                {contact.unread ? (
                  <span className="w-4.5 h-4.5 min-w-[18px] min-h-[18px] bg-green-500 text-white rounded-full text-[10px] flex items-center justify-center font-medium">
                    {contact.unread}
                  </span>
                ) : contact.delivered ? (
                  <span className="text-green-500 text-xs">✓✓</span>
                ) : contact.sent ? (
                  <span className="text-gray-400 text-xs">✓</span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${avatarColors[activeId] ?? "bg-gray-100 text-gray-600"}`}
              >
                {getInitials(activeContact.name)}
              </div>
              {activeContact.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {activeContact.name}
              </p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <button className="hover:text-gray-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <rect x="2" y="7" width="15" height="10" rx="2" />
                <path d="M17 9l5-3v12l-5-3" />
              </svg>
            </button>
            <button className="hover:text-gray-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-5 flex flex-col gap-3">
          <div className="flex-1" />
          <div className="self-center">
            <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
              Today
            </span>
          </div>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.incoming ? "justify-start" : "justify-end"}`}
            >
              {msg.incoming && (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${avatarColors[activeId]}`}
                >
                  {getInitials(activeContact.name)}
                </div>
              )}
              <div
                className={`max-w-xs px-4 pt-2.5 pb-1.5 rounded-2xl ${
                  msg.incoming
                    ? "bg-orange-100 text-orange-900 rounded-bl-sm"
                    : "bg-pink-200 text-pink-900 rounded-br-sm"
                }`}
              >
                <p className="text-sm leading-snug">{msg.text}</p>
                <div className="flex justify-end items-center gap-1 mt-1">
                  <span className="text-[11px] opacity-60">{msg.time}</span>
                  {!msg.incoming && (
                    <span className="text-[11px] text-pink-600 opacity-80">
                      ✓✓
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-5 py-3.5 border-t border-gray-100 flex items-center gap-3">
          <button className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
          <input
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            placeholder="Type your message here.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="text-sm font-medium text-green-500 hover:text-green-600 transition-colors whitespace-nowrap"
          >
            Send message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
