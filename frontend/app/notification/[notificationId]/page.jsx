"use client";
import LoadingSpinner from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/Store/AuthStore";
import { useChatStore } from "@/Store/ChatStore";
import { useUserActions } from "@/Store/UserAction";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";

const page = () => {
  const params = useParams();
  const { notificationId } = params;
  const { getNotification, selectedNotification } = useUserActions();
  const { user } = useAuthStore();
  const { createChat, isLoading } = useChatStore();
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (notificationId) {
      getNotification({ notificationId });
    }
  }, [notificationId]);

  // Separating notification data
  const notification = selectedNotification?.notification;
  const post = notification?.postId;
  const sender = notification?.sender;

  const handleChat = async () => {
    const data = { userId1: user._id, userId2: sender._id };
    const res = await createChat(data);
    if (res) {
      router.push(`/chats?chatId=${res.chat._id}`);
    }
  };

  const changeImage = (i) => {
    setIndex(i);
  };

  if (!post) {
    return <LoadingSpinner />;
  }

  return (
    <main className="px-4 md:px-10 py-6 min-h-screen relative">
      <Navbar />
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#ede8e0] shadow-sm">
        <Image
          src={sender?.profilePicUrl}
          alt="sender"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />

        <div className="flex flex-col">
          <span className="font-semibold text-lg">{sender?.username}</span>
          <span className="text-sm text-gray-500">Wants to adopt your pet</span>
        </div>
      </div>
      <section className="flex flex-col lg:flex-row gap-12">
        {/* LEFT SIDE */}
        <div className="sm:w-3/5 mx-auto my-12 xl:my-0 xl:w-1/2 flex flex-col items-center">
          {/* Main Image */}
          <div className="bg-primary/80 p-6 md:p-10 rounded-[30px] shadow-2xl xl:rotate-[-4deg] hover:rotate-0 transition duration-500">
            <Image
              src={post?.images?.[index]?.picURL}
              alt="pet"
              width={12000}
              height={12000}
              loading="eager"
              className="object-contain rounded-2xl"
            />

            {/* Thumbnails */}
            <div className="flex gap-4 mt-6 justify-center">
              {post.images?.map((img, i) => (
                <div
                  key={i}
                  onClick={() => changeImage(i)}
                  className={`w-18 h-18 cursor-pointer rounded-xl overflow-hidden border-4 ${
                    index === i ? "border-white" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img.picURL}
                    alt="thumbnail"
                    width={100}
                    height={100}
                    loading="eager"
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 space-y-6">
          {/* Name */}
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold">{post?.animalBreed}</h2>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-500 gap-2">
            <MdLocationPin size={18} />
            <span>{post?.location}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-4">
            <span className="px-6 py-2 rounded-full bg-primary/20 text-primary">
              {post?.gender}
            </span>

            <span className="px-6 py-2 rounded-full bg-primary/20 text-primary">
              {post?.age} Years
            </span>

            <span className="px-6 py-2 rounded-full bg-primary/20 text-primary">
              {post?.animalType}
            </span>
          </div>

          {/* Health */}
          <div className="bg-white rounded-2xl border border-[#ede8e0] p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Medical Information
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">
                  {post?.healthCondition}
                </span>
                <span
                  className="text-sm font-medium px-3 py-0.5 rounded-full"
                  style={{ background: "#f5f0e8", color: "#5a4a3a" }}
                >
                  {post?.healthCondition}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">
                  {post?.vaccinationStatus}
                </span>
                <span
                  className="text-sm font-medium px-3 py-0.5 rounded-full"
                  style={{ background: "#f5f0e8", color: "#5a4a3a" }}
                >
                  {post?.vaccinationStatus}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">
                  {post?.sterilizationStatus}
                </span>
                <span
                  className="text-sm font-medium px-3 py-0.5 rounded-full"
                  style={{ background: "#f5f0e8", color: "#5a4a3a" }}
                >
                  {post?.sterilizationStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Description card */}
          <div className="bg-white rounded-2xl border border-[#ede8e0] p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              About
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {post?.description}
            </p>
          </div>
          {/* Button */}
          <button
            className="primary-btn w-full py-3 rounded-full text-lg"
            onClick={handleChat}
          >
            Chat with {sender?.username}
          </button>
        </div>
      </section>
    </main>
  );
};

export default page;
