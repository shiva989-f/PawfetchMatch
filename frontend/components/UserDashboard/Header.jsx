import { useState } from "react";
import { IoNotifications, IoChatbubbleEllipses } from "react-icons/io5";
import Notifications from "../Notifications";
import Image from "next/image";
import { useAuthStore } from "@/Store/AuthStore";
import { useRouter } from "next/navigation";

const Header = () => {
  const [search, setSearch] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm px-5 py-3 flex items-center justify-between gap-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 w-64">
        <svg
          className="text-gray-400 shrink-0"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Chat Icon */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
          onClick={() => router.push("/chats")}
        >
          <IoChatbubbleEllipses size={20} />
        </button>

        {/* Notification Icon */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
          onClick={() => setIsNotificationVisible((prev) => !prev)}
        >
          <IoNotifications size={20} />
          {/* Red dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <button className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-purple-200 shrink-0">
          <Image
            width={500}
            height={500}
            src={user?.profilePicUrl}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
      <Notifications
        isNotificationVisible={isNotificationVisible}
        closeNotifications={() => setIsNotificationVisible(false)}
      />
    </header>
  );
};

export default Header;
