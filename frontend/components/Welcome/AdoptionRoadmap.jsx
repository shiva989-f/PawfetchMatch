import { alkatra, corinthia } from "@/app/font";
import { roadmapSteps } from "@/utils/Data";
import React, { useEffect, useRef, useState } from "react";
import { PawIcon } from "../SvgIcons";

const RoadmapCard = ({ step, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group bg-white border-[1.5px] border-black/5 rounded-3xl p-7 cursor-pointer transition-all duration-300 ${step.hoverBg} ${step.hoverBorder} ${step.hoverShadow} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{
        transitionDelay: visible ? `${index * 80}ms` : "0ms",
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className={`text-[40px] font-black opacity-20 font-serif leading-none ${step.textCls}`}
        >
          {step.number}
        </span>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.bgCls} ${step.textCls}`}
        >
          <PawIcon size={20} />
        </div>
      </div>
      <h3 className="m-0 mb-2.5 text-lg font-bold text-[#1a1a1a] tracking-tight">
        {step.title}
      </h3>
      <p className="m-0 text-sm text-[#777] leading-relaxed">{step.desc}</p>
    </div>
  );
};

const AdoptionRoadmap = () => {
  return (
    <section className="py-25 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end gap-4 mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FFF0F0] border border-[#FF6B6B]/20 rounded-full py-1.5 px-3.5 mb-4">
              <span className="text-xs text-[#FF6B6B] font-semibold tracking-wide">
                HOW IT WORKS
              </span>
            </div>
            <h2
              className={`${alkatra.className} font-serif text-[clamp(32px,4vw,52px)] font-bold text-[#1a1a1a] m-0 leading-tight tracking-tight`}
            >
              Getting Started
              <br />
              Is Easy<span className="text-[#FF6B6B]">.</span>
            </h2>
            <p className="text-[#888] text-base mt-3">
              One small decision can change a pet's entire world.
            </p>
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapSteps.map((step, i) => (
            <RoadmapCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdoptionRoadmap;
