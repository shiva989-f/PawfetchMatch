import { useAuthStore } from "@/Store/AuthStore";
import Image from "next/image";
import React, { useState } from "react";
import Notifications from "./Notifications";
import { useRouter } from "next/navigation";
import { IoChatbubbleEllipses, IoNotifications } from "react-icons/io5";

const Navbar = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  return (
    <header className="w-full flex justify-between items-center gap-5 mb-14 pb-2 border-gray-200 border-b">
      {/* Logo */}
      <h1
        className="text-2xl sm:text-3xl font-black text-center"
        onClick={() => router.push("/pets")}
      >
        Pawfect<span className="text-primary">.</span>
      </h1>

      <div className="flex justify-betweens items-center gap-3 sm:gap-6">
        {/* Chat Icon */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
          onClick={() => router.push("/chats")}
        >
          <IoChatbubbleEllipses size={20} />
        </button>
        {/* Notification Icon */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-xl  hover:bg-gray-100 transition-colors text-gray-500"
          onClick={() => setIsNotificationVisible((prev) => !prev)}
        >
          <IoNotifications size={20} />
          {/* Red dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
        </button>
        {user?.profilePicUrl && (
          <Image
            src={user.profilePicUrl}
            width={50}
            height={50}
            alt={user.username}
            className="w-10 h-10 rounded-full border-2 border-primary"
            onClick={() => {
              if (user.role === "admin") router.push("/admin/dashboard");
              else router.push("/profile");
            }}
          />
        )}{" "}
      </div>
      <Notifications
        isNotificationVisible={isNotificationVisible}
        closeNotifications={() => setIsNotificationVisible(false)}
      />
    </header>
  );
};

export default Navbar;
