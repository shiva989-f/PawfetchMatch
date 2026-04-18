import { useAuthStore } from "@/Store/AuthStore";
import { useUserActions } from "@/Store/UserAction";
import { useEffect, useRef } from "react";
import LoadingSpinner from "./LoadingScreen";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";

const Notifications = ({ isNotificationVisible, closeNotifications }) => {
  const { user } = useAuthStore();
  const { getAllNotifications, notifications } = useUserActions();
  const router = useRouter();

  const notificationRef = useRef(null);

  useEffect(() => {
    if (user?._id) {
      getAllNotifications(user._id);
    }

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
      } justify-end bg-black/30 backdrop-blur-sm`}
    >
      <div
        ref={notificationRef}
        className="w-87.5 h-screen bg-white shadow-2xl p-5 overflow-y-auto border-l border-gray-200 flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          <IoMdClose
            className="text-gray-500 text-2xl cursor-pointer hover:text-red-500 transition-transform duration-300 hover:rotate-90"
            onClick={closeNotifications}
          />
        </div>

        {/* Notifications List */}
        <div className="flex flex-col gap-3">
          {notifications.length === 0 && (
            <p className="text-sm text-gray-400 text-center mt-10">
              No notifications yet
            </p>
          )}

          {notifications.map((notification) => (
            <div
              key={notification._id}
              className="group flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer"
              onClick={() => {
                router.push(`/notification/${notification._id}`);
              }}
            >
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={notification?.sender?.profilePicUrl}
                  width={45}
                  height={45}
                  alt={notification?.sender?.username}
                  className="rounded-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                <p className="text-sm text-gray-800 leading-snug">
                  <span className="font-semibold text-gray-900 capitalize">
                    {notification?.sender?.username}
                  </span>{" "}
                  {notification?.message}
                </p>

                <span className="text-xs text-gray-400 mt-1">
                  {formatDate(notification.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
