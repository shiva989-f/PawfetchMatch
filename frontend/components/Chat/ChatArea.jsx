"use client";
import { useAuthStore } from "@/Store/AuthStore";
import { useChatStore } from "@/Store/ChatStore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const avatarColors = [
  "bg-rose-400",
  "bg-violet-400",
  "bg-amber-400",
  "bg-teal-400",
  "bg-sky-400",
  "bg-emerald-400",
  "bg-pink-400",
  "bg-orange-400",
  "bg-indigo-400",
  "bg-cyan-400",
  "bg-lime-400",
];

const ChatArea = ({ chatId, activeContact }) => {
  const { user } = useAuthStore();
  const {
    getMessages,
    fetchedMessages,
    chats,
    sendMessage,
    getLatestMessages,
    markAsSeen,
  } = useChatStore();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const pollingRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;
    getMessages(chatId);
    markAsSeen(chatId);
  }, [chatId]);

  useEffect(() => {
    if (!chatId) return;
    pollingRef.current = setInterval(() => {
      getLatestMessages(chatId);
    }, 3000);
    return () => clearInterval(pollingRef.current);
  });

  useEffect(() => {
    if (fetchedMessages) setMessages(fetchedMessages);
  }, [fetchedMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //   Handle Image Selection
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
    // reset input so same file(s) can be re-selected if removed
    e.target.value = "";
  };

  // Remove selected image
  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clearImages = () => {
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleSend = async () => {
    if (!input.trim() && imageFiles.length === 0) return;
    setIsSending(true);
    try {
      await sendMessage({
        chatId,
        text: input.trim(),
        files: imageFiles, // pass all images
      });
      setInput("");
      clearImages();
    } finally {
      setIsSending(false);
    }
  };

  const activeAvatarColor =
    avatarColors[
      chats.findIndex((c) => c._id === activeContact?._id) % avatarColors.length
    ] || avatarColors[0];

  const isMine = (msg) =>
    msg.senderId === user._id || msg.senderId?._id === user._id;

  return (
    <main className="flex-1 flex flex-col bg-gray-50 min-w-0 px-0">
      {!activeContact ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
          Select a conversation to start chatting
        </div>
      ) : (
        <>
          {/* ── Chat Header ── */}
          <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full ${activeAvatarColor} flex items-center justify-center overflow-hidden shadow-sm shrink-0`}
              >
                {activeContact.user?.profilePicUrl ? (
                  <Image
                    src={activeContact.user.profilePicUrl}
                    width={36}
                    height={36}
                    alt={activeContact.user.username}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white text-xs font-bold">
                    {activeContact.user?.username?.[0]?.toUpperCase() ?? "?"}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  {activeContact.user?.username}
                </h2>
              </div>
            </div>
          </header>

          {/* ── Messages ── */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <div className="flex items-center justify-center">
              <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                Today
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-xs text-gray-400">
                  No messages yet. Say hello!
                </p>
              </div>
            ) : (
              messages.map((msg) => {
                const mine = isMine(msg);
                return (
                  <div
                    key={msg._id}
                    className={`flex ${mine ? "justify-end" : "justify-start"} items-end gap-2`}
                  >
                    {!mine && (
                      <div
                        className={`w-7 h-7 rounded-full ${activeAvatarColor} flex items-center justify-center overflow-hidden shrink-0 mb-1`}
                      >
                        {activeContact.user?.profilePicUrl ? (
                          <Image
                            src={activeContact.user.profilePicUrl}
                            width={28}
                            height={28}
                            alt={activeContact.user.username}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-[10px] font-bold">
                            {activeContact.user?.username?.[0]?.toUpperCase() ??
                              "?"}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="max-w-xs lg:max-w-sm space-y-1">
                      {/* Images grid */}
                      {msg.images?.length > 0 && (
                        <div
                          className={`grid gap-1 ${msg.images.length > 1 ? "grid-cols-2" : "grid-cols-1"} ${mine ? "justify-items-end" : "justify-items-start"}`}
                        >
                          {msg.images.map((img) => (
                            <div
                              key={img.picId}
                              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                            >
                              <Image
                                src={img.picURL}
                                width={160}
                                height={140}
                                alt="Sent image"
                                className="object-cover rounded-2xl"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Text bubble */}
                      {msg.text && (
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            mine
                              ? "bg-linear-to-br from-primary to-secondary text-white rounded-br-sm"
                              : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                          }`}
                        >
                          {msg.text}
                        </div>
                      )}

                      {/* Timestamp + tick */}
                      <p
                        className={`text-[10px] text-gray-400 ${mine ? "text-right" : "text-left"}`}
                      >
                        {msg.time ??
                          new Date(msg.createdAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        {mine && (
                          <span className="ml-1">
                            {msg.status === "seen" ? (
                              <svg
                                className="inline w-3 h-3 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M2 12l4 4L16 6M6 12l4 4L20 6"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="inline w-3 h-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2.5}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={bottomRef} />
          </div>

          {/* ── Multi-image preview strip ── */}
          {imagePreviews.length > 0 && (
            <div className="px-4 py-2 bg-white border-t border-gray-100 flex items-center gap-2 flex-wrap">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative shrink-0">
                  <Image
                    src={src}
                    width={72}
                    height={72}
                    alt={`Preview ${index + 1}`}
                    className="rounded-xl object-cover border border-gray-200 w-18 h-18"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs leading-none hover:bg-red-500 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
              {/* Add more button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-[72px] h-18 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors shrink-0"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Input Bar */}
          <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple // ← key change
              className="hidden"
              onChange={handleImageSelect}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isSending && handleSend()}
              placeholder="Type your message here.."
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
            />

            <button
              onClick={handleSend}
              disabled={isSending || (!input.trim() && imageFiles.length === 0)}
              className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition-all active:scale-95
                ${
                  isSending || (!input.trim() && imageFiles.length === 0)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                    : "bg-linear-to-br from-primary/90 to-secondary/90 hover:from-primary hover:to-secondary text-white cursor-pointer"
                }`}
            >
              {isSending ? (
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : (
                <>
                  Send
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default ChatArea;
