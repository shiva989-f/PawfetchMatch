import { useAuthStore } from "@/Store/AuthStore";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import Notifications from "./Notifications";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useAuthStore();
  const router = useRouter(); 
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  return (
    <header className="w-full flex justify-between items-center gap-5 mb-14">
      {/* Logo */}
      <h1
        className="text-2xl sm:text-3xl font-black text-center"
        onClick={() => router.push("/pets")}
      >
        Pawfect<span className="text-primary">.</span>
      </h1>

      <div className="flex justify-betweens items-center gap-3 sm:gap-6">
        <div
          className="p-2 shadow-2xl rounded-xl bg-primary"
          onClick={() => setIsNotificationVisible((prev) => !prev)}
        >
          <IoIosNotificationsOutline className="text-2xl text-white" />
        </div>
        {user?.profilePicUrl && (
          <Image
            src={user.profilePicUrl}
            width={50}
            height={50}
            alt={user.username}
            className="w-10 h-10 rounded-full border-2 border-primary"
            onClick={() => router.push("/profile")}
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
