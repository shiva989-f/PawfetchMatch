"use client";
import { useEffect, useState } from "react";
const LoadingSpinner = () => {
  const [tagIndex, setTagIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const taglines = [
    "Finding your perfect companion…",
    "Connecting loving homes with pets…",
    "Every pet deserves a family…",
    "Almost there — good things take time 🐾",
  ];

  const pills = [
    {
      emoji: "🐕",
      label: "Dogs",
      bg: "bg-[#F6EFD1]",
      text: "text-[#7a6a2e]",
      delay: "delay-100",
    },
    {
      emoji: "🐱",
      label: "Cats",
      bg: "bg-[#F0D8CB]",
      text: "text-[#7a4a2e]",
      delay: "delay-200",
    },
    {
      emoji: "🦜",
      label: "Birds",
      bg: "bg-[#C4E6F2]",
      text: "text-[#1a6080]",
      delay: "delay-300",
    },
    {
      emoji: "🐰",
      label: "Rabbits",
      bg: "bg-[#B1FFDC]",
      text: "text-[#1a6040]",
      delay: "delay-[400ms]",
    },
    {
      emoji: "🐹",
      label: "Hamsters",
      bg: "bg-[#FECDD0]",
      text: "text-[#6a1020]",
      delay: "delay-500",
    },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTagIndex((i) => (i + 1) % taglines.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#faf8f5] gap-0 font-sans">
      <div className="relative w-24 h-24">
        <div
          className="absolute inset-0 rounded-full border-[2.5px] border-transparent border-t-[#fc5739] border-r-[#fc573933] animate-spin"
          style={{ animationDuration: "1.1s" }}
        />
        <div
          className="absolute inset-3 rounded-full border-2 border-transparent border-b-[#fc5739aa] border-l-[#fc573933]"
          style={{
            animation: "spin 0.8s cubic-bezier(.6,.1,.4,.9) infinite reverse",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-[26px] animate-[pulse_1.6s_ease-in-out_infinite]">
          🐾
        </div>
      </div>

      <h1
        className="mt-7 text-[30px] font-black tracking-tight text-[#1a1814]"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Pawfect<span className="text-[#fc5739]">.</span>
      </h1>

      <p
        className={`mt-1.5 text-sm text-[#8c8882] h-5 transition-all duration-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
      >
        {taglines[tagIndex]}
      </p>

      <div className="flex gap-1.5 mt-8">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.75 h-1.75 rounded-full bg-[#fc5739] animate-bounce"
            style={{
              opacity: 1 - i * 0.3,
              animationDelay: `${i * 0.18}s`,
              animationDuration: "1.2s",
            }}
          />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 mt-9 max-w-xs">
        {pills.map((p, i) => (
          <span
            key={p.label}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium animate-[scaleIn_.4s_cubic-bezier(.22,.68,0,1.4)_both] ${p.bg} ${p.text} ${p.delay}`}
          >
            <span className="text-base">{p.emoji}</span>
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
