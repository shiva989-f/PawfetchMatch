"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_URL);

    socketRef.current.on("connect", () => {
      console.log("Connected:", socketRef.current.id);
    });

    socketRef.current.on("welcome", (msg) => {
      console.log(msg);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (message != "") {
      console.log(message);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({message: message}),
      });
      console.log("Response: ", res);
    }
  };

  return (
    <>
      <div>
        <form>
          <input
            type="text"
            placeholder="Message..."
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" onClick={submitHandler}>
            Send
          </button>
        </form>
      </div>
    </>
  );
}
