import { alkatra } from "@/app/font";
import { stories } from "@/utils/Data";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Story = () => {
  const [active, setActive] = useState(0);
  const prev = () =>
    setActive((a) => (a - 1 + stories.length) % stories.length);
  const next = () => setActive((a) => (a + 1) % stories.length);
  const s = stories[active];

  return (
    <section className="py-25 px-6 md:px-12 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF0F0] border border-[#FF6B6B]/20 rounded-full py-1.5 px-3.5 mb-4">
            <span className="text-xs text-[#FF6B6B] font-semibold tracking-wide">
              ❤️ SUCCESS STORIES
            </span>
          </div>
          <h2
            className={`${alkatra.className} font-serif text-[clamp(32px,4vw,52px)] font-bold text-[#1a1a1a] m-0 mb-3 tracking-tight`}
          >
            Adoption Is an Act
            <br />
            of <span className="text-[#FF6B6B]">Love.</span>
          </h2>
          <p className="text-[#888] text-base m-0">
            Because Every Life Matters.
          </p>
        </div>

        {/* Story card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <div className="relative">
            <div
              className={`rounded-4xl p-12 flex flex-col items-center justify-center min-h-80 relative overflow-hidden transition-colors duration-400 ${s.bgCls}`}
            >
              <div
                className={`absolute -top-10 -right-10 w-50 h-50 rounded-full ${s.blobCls}`}
              />
              <span className="text-[80px] mb-4 drop-shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all duration-300">
                {s.emoji}
              </span>
              <h3
                className={`${alkatra.className} font-serif text-[28px] font-bold text-[#1a1a1a] m-0 mb-1`}
              >
                {s.name}
              </h3>
              <p className="text-[#888] m-0 text-sm">
                {s.species} · {s.city}
              </p>

              <div className="flex gap-2 mt-6">
                {stories.map((story, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 p-0 ${i === active ? `w-6 ${story.bgCls.split("/")[0]}` : "w-2 bg-[#ddd]"}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={prev}
                className={`flex-1 p-3 bg-white border-[1.5px] border-black/5 rounded-2xl cursor-pointer flex items-center justify-center transition-colors duration-200 text-[#1a1a1a] ${s.hoverBorderCls}`}
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={next}
                className={`flex-1 p-3 bg-white border-[1.5px] border-black/5 rounded-2xl cursor-pointer flex items-center justify-center transition-colors duration-200 text-[#1a1a1a] ${s.hoverBorderCls}`}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bgCls}`}
              >
                <span className="text-base">{s.emoji}</span>
              </div>
              <span className="text-[13px] font-semibold text-[#888]">
                {s.city}, India
              </span>
            </div>

            <blockquote
              className={`m-0 mb-7 pl-5 border-l-[3px] text-[17px] text-[#444] leading-[1.8] italic ${s.borderCls}`}
            >
              "{s.story}"
            </blockquote>

            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg bg-linear-to-br ${s.gradCls}`}
              >
                👤
              </div>
              <div>
                <p className="m-0 font-semibold text-[#1a1a1a] text-[15px]">
                  {s.author}
                </p>
                <p className="m-0 text-[13px] text-[#999]">Shared on Pawfect</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
