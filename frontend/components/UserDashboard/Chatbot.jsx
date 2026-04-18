"use client";
import { useState } from "react";
import Image from "next/image";
import { useUserActions } from "@/Store/UserAction";
import ReactMarkdown from "react-markdown";

const initialMessages = [
  {
    id: 1,
    text: "Hello! What do you want to ask?",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    sent: false,
  },
];
const Chatbot = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const { chatbot, isLoading } = useUserActions();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = {
      id: Date.now(),
      text: input,
      time: currentTime,
      sent: true,
    };

    setMessages((prev) => [...prev, userMsg]);

    const userInput = input;
    setInput("");
    const typingId = Date.now() + 1;

    const typingMsg = {
      id: typingId,
      text: "Typing",
      time: currentTime,
      sent: false,
    };

    setMessages((prev) => [...prev, typingMsg]);
    const reply = await chatbot({ message: userInput });
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === typingId ? { ...msg, text: reply || "No response" } : msg,
      ),
    );
  };
  return (
    <main className="flex-1 flex flex-col bg-gray-50 min-w-0 p-0">
      {/* Chat Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm`}
          >
            <Image src={"/robot.png"} width={50} height={50} alt="robot png" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Pawfect Chatbot</h2>
            <p className="text-xs text-emerald-500 font-medium">Online</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {/* Date separator */}
        <div className="flex items-center justify-center">
          <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sent ? "justify-end" : "justify-start"} items-end gap-2`}
          >
            {!msg.sent && (
              <img src={"/robot.png"} alt="robot png" className="w-10" />
            )}
            <div className={`max-w-xs lg:max-w-sm`}>
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sent
                    ? "bg-linear-to-br from-primary to-secondary text-white rounded-br-sm"
                    : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                }`}
              >
                {!msg.sent ? (
                  msg.text === "Typing" ? (
                    <span className="animate-pulse">Typing...</span>
                  ) : (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  )
                ) : (
                  msg.text
                )}
              </div>
              <p
                className={`text-[10px] text-gray-400 mt-1 ${msg.sent ? "text-right" : "text-left"}`}
              >
                {msg.time}
                {msg.sent && (
                  <svg
                    className="inline ml-1 w-3 h-3 text-primary"
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
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 shrink-0">
        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0">
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
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message here.."
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
        />
        <button
          onClick={sendMessage}
          className="flex items-center gap-1.5 bg-linear-to-br from-primary/90 to-secondary/90 hover:from-primary hover:to-secondary text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition-all active:scale-95"
        >
          Send message
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
        </button>
      </div>
    </main>
  );
};

export default Chatbot;
