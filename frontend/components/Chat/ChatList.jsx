"use client";
import { useAuthStore } from "@/Store/AuthStore";
import { useChatStore } from "@/Store/ChatStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const avatarColors = [
  "bg-violet-400",
  "bg-emerald-400",
  "bg-blue-400",
  "bg-rose-400",
  "bg-amber-400",
  "bg-cyan-400",
];

const ChatList = ({ activeContact, setActiveContact }) => {
  const { user } = useAuthStore();
  const { getChatList, chats } = useChatStore();
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    getChatList();
  }, []);

  const filtered = chats.filter((c) =>
    c.user.username.toLowerCase().includes(search.toLowerCase()),
  );

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return "";
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-100 flex flex-col shadow-sm shrink-0">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Messages
          </h1>
          <div
            className="w-9 h-9 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => {
              if (user.role === "admin") router.push("/admin/dashboard");
              else router.push("/profile");
            }}
          >
            <Image
              src={user.profilePicUrl}
              width={40}
              height={40}
              alt={user.username}
              className="rounded-full object-cover"
            />
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all"
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
        {filtered.length === 0 ? (
          <p className="text-center text-xs text-gray-400 mt-8">
            No conversations found
          </p>
        ) : (
          filtered.map((contact, i) => (
            <button
              key={contact._id}
              onClick={() => {
                setActiveContact(contact);
                router.push(`/chats?chatId=${contact._id}`);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group ${
                activeContact?._id === contact._id
                  ? "bg-violet-50 shadow-sm"
                  : "hover:bg-gray-50"
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center overflow-hidden shadow-sm`}
                >
                  <Image
                    src={contact.user.profilePicUrl}
                    width={40}
                    height={40}
                    alt={contact.user.username}
                    className="rounded-full object-cover"
                  />
                </div>
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-semibold truncate ${
                      activeContact?._id === contact._id
                        ? "text-primary"
                        : "text-gray-800"
                    }`}
                  >
                    {contact.user.username}
                  </span>
                  <span className="text-[10px] text-gray-400 shrink-0 ml-1">
                    {formatTime(contact.updatedAt)}
                  </span>
                </div>
                <p
                  className={`text-xs truncate mt-0.5 ${
                    contact.unread
                      ? "text-primary/80 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {contact.lastMessage || "No messages yet"}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};

export default ChatList;
