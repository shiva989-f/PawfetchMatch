"use client";
import ChatArea from "@/components/Chat/ChatArea";
import ChatList from "@/components/Chat/ChatList";
import EmptyChatArea from "@/components/Chat/EmptyChatArea";
import { useChatStore } from "@/Store/ChatStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { chats } = useChatStore();
  const [activeContact, setActiveContact] = useState(null);
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  useEffect(() => {
    if (chats.length > 0 && !activeContact) {
      setActiveContact(chats[0]);
    }
  }, [chats]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans antialiased">
      <ChatList
        activeContact={activeContact}
        setActiveContact={setActiveContact}
      />
      {chatId ? (
        <ChatArea chatId={chatId} activeContact={activeContact} />
      ) : (
        <EmptyChatArea />
      )}
    </div>
  );
};

export default Page;
