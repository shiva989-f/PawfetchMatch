import { useRouter } from "next/navigation";
import StatsBar from "./StatsBar";
import { useEffect, useState } from "react";
import { HeartIcon, PawIcon } from "../SvgIcons";
import { FaArrowRight } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { alkatra } from "@/app/font";

const Hero = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const tags = ["🐕 Dogs", "🐱 Cats", "🐦 Birds", "🐇 Rabbits"];

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-30 pb-20 bg-[#FFFDF9] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-30 -right-30 w-125 h-125 rounded-full bg-[radial-gradient(circle,rgba(255,107,107,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-20 -left-25 w-100 h-100 rounded-full bg-[radial-gradient(circle,rgba(88,86,214,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[40%] left-[45%] w-75 h-75 rounded-full bg-[radial-gradient(circle,rgba(255,149,0,0.07)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating paw prints */}
      <div className="absolute top-[15%] left-[8%] text-[#FF6B6B] opacity-[0.12] -rotate-20">
        <PawIcon size={18} />
      </div>
      <div className="absolute top-[70%] left-[12%] text-[#FF6B6B] opacity-[0.08] rotate-15">
        <PawIcon size={14} />
      </div>
      <div className="absolute top-[25%] right-[10%] text-[#FF6B6B] opacity-[0.1] rotate-30">
        <PawIcon size={22} />
      </div>
      <div className="absolute top-[60%] right-[8%] text-[#FF6B6B] opacity-[0.08] -rotate-10">
        <PawIcon size={16} />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center z-10">
        {/* Left */}
        <div
          className={`transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7.5"}`}
        >
          <div className="inline-flex items-center gap-1.5 bg-[#FFF0F0] border border-[#FF6B6B]/20 rounded-full py-1.5 px-3.5 mb-6">
            <span className="text-[13px] text-[#FF6B6B] font-semibold tracking-wide">
              🐾 Free Adoption Platform
            </span>
          </div>
          <h1
            className={`${alkatra.className} font-serif text-[clamp(42px,5vw,72px)] font-bold leading-[1.1] text-[#1a1a1a] mb-5 tracking-tight`}
          >
            Find Your
            <br />
            <span className="text-[#FF6B6B] relative">
              Perfect
              <svg
                className="absolute bottom-4 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M4 8 Q100 2 196 8"
                  stroke="#FF6B6B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>
            <br />
            Companion
          </h1>
          <p className="text-lg text-[#666] leading-relaxed mb-9 max-w-105">
            Adopt dogs, cats & rescued animals looking for a loving home. Give a
            pet their second chance today.
          </p>

          {/* Search bar */}
          <div className="flex items-center bg-white border-2 border-black/5 rounded-full py-2.5 pl-5.5 pr-4 gap-2.5 max-w-105 shadow-[0_4px_24px_rgba(0,0,0,0.06)] mb-5 transition-colors duration-200 focus-within:border-primary">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a companion…"
              className="flex-1 border-none outline-none text-[15px] text-[#1a1a1a] bg-transparent placeholder-gray-400"
            />
            <button className="bg-[#FF6B6B] rounded-full w-9.5 h-9.5 flex items-center justify-center text-white cursor-pointer shrink-0 hover:bg-[#e85555] transition-colors">
              <BsSearch />
            </button>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {tags.map((t) => (
              <span
                key={t}
                className="py-1.5 px-3.5 bg-white border-[1.5px] border-black/5 rounded-full text-[13px] text-[#444] cursor-pointer transition-colors duration-200 hover:border-[#FF6B6B] hover:text-[#FF6B6B] hover:bg-[#FFF0F0]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right — visual card stack */}
        <div
          className={`relative h-115 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-5 scale-[0.96]"}`}
        >
          {/* Back card */}
          <div className="absolute top-7.5 left-7.5 -right-5 -bottom-2.5 bg-[#FFE8E8] rounded-4xl rotate-[4deg]" />
          <div className="absolute top-3.75 left-3.75 -right-2.5 -bottom-1.25 bg-[#FFECD4] rounded-4xl rotate-2" />

          {/* Main card */}
          <div className="absolute inset-0 bg-white rounded-4xl shadow-[0_24px_64px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col">
            {/* Image area */}
            <div className="flex-1 bg-linear-to-br from-[#FFF0F0] to-[#FFE4C4] flex items-center justify-center text-[100px] relative">
              <span className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
                🐕
              </span>
              <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-[0_2px_8px_rgba(0,0,0,0.1)] text-[#FF6B6B] cursor-pointer hover:scale-110 transition-transform">
                <HeartIcon />
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-full py-1.5 px-3 text-xs font-semibold text-[#1a1a1a]">
                📍 Jaipur, Rajasthan
              </div>
            </div>
            {/* Card info */}
            <div className="px-6 py-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3
                    className={`${alkatra.className} m-0 text-[20px] font-bold text-[#1a1a1a] font-serif`}
                  >
                    Sheru
                  </h3>
                  <p className="m-0 text-[13px] text-[#888]">
                    Golden Retriever · 2 years · Male
                  </p>
                </div>
                <span className="bg-[#F0FFF4] text-[#34C759] text-[12px] font-semibold py-1 px-2.5 rounded-full">
                  Vaccinated
                </span>
              </div>
              <button className="w-full bg-[#FF6B6B] text-white border-none rounded-full p-3 text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 hover:bg-[#e85555] transition-colors mt-2">
                Request Adoption <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <StatsBar />
    </section>
  );
};

export default Hero;
