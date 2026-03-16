import { useAuthStore } from "@/Store/AuthStore";
import { useUserActions } from "@/Store/UserAction";
import { useEffect, useRef } from "react";
import LoadingSpinner from "./LoadingScreen";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

const Notifications = ({ isNotificationVisible, closeNotifications }) => {
  const { user } = useAuthStore();
  const { getNotifications, notifications } = useUserActions();

  const notificationRef = useRef(null);

  useEffect(() => {
    if (user?._id) {
      getNotifications(user._id);
    }
    console.log(notifications);

    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        closeNotifications();
      }
    };

    if (isNotificationVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isNotificationVisible, user]);

  const formatDate = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);
    if (seconds < 60) return "Just Now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `Yesterday`;
    if (days < 7) return `${days} days ago`;
    return new Date(date).toLocaleDateString();
  };

  if (!notifications) return <LoadingSpinner />;

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isNotificationVisible ? "flex" : "hidden"
      } justify-end`}
    >
      <div
        ref={notificationRef}
        className="w-87.5 h-screen bg-gray-50 shadow-2xl p-5 overflow-y-auto border-l border-gray-200"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <IoMdClose
            className="sm:hidden text-primary text-2xl transition-all duration-500 ease-in-out hover:rotate-180"
            onClick={() => closeNotifications()}
          />
        </div>

        <div className="flex flex-col gap-3">
          {notifications.length === 0 && (
            <p className="text-sm text-gray-500">No notifications</p>
          )}

          {notifications.map((notification) => (
            <div
              key={notification._id}
              className="p-3 rounded-lg bg-white shadow hover:scale-95 transition"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={notification?.sender?.profilePicUrl}
                  width={45}
                  height={45}
                  alt={notification?.sender?.username}
                  className="rounded-full"
                />

                <div className="flex flex-col">
                  <span className="text-sm font-medium capitalize text-primary">
                    {notification?.sender?.username}
                  </span>
                  <span className="text-xs text-gray-600">
                    {notification?.message}
                  </span>
                </div>
              </div>
              <p className="text-[8px] text-end">
                {formatDate(notification.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
