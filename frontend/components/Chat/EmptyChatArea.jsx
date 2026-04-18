import React from "react";

const EmptyChatArea = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-[#f9f7f4] px-6 select-none">
      {/* Illustration */}
      <div className="mb-7 animate-[float_3.2s_ease-in-out_infinite]">
        <svg
          width="180"
          height="170"
          viewBox="0 0 180 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chat bubbles */}
          <g className="animate-[float_3.2s_ease-in-out_infinite]">
            <rect
              x="108"
              y="18"
              width="58"
              height="28"
              rx="14"
              fill="#7F77DD"
              opacity="0.18"
            />
            <circle cx="120" cy="32" r="4" fill="#7F77DD" opacity="0.5" />
            <circle cx="133" cy="32" r="4" fill="#7F77DD" opacity="0.5" />
            <circle cx="146" cy="32" r="4" fill="#7F77DD" opacity="0.5" />
          </g>
          <g className="animate-[float_3.2s_ease-in-out_infinite_0.6s]">
            <rect
              x="14"
              y="26"
              width="46"
              height="22"
              rx="11"
              fill="#1D9E75"
              opacity="0.15"
            />
            <circle cx="26" cy="37" r="3" fill="#1D9E75" opacity="0.5" />
            <circle cx="37" cy="37" r="3" fill="#1D9E75" opacity="0.5" />
            <circle cx="48" cy="37" r="3" fill="#1D9E75" opacity="0.5" />
          </g>
          {/* Body */}
          <ellipse cx="90" cy="130" rx="38" ry="28" fill="#F5C4B3" />
          {/* Head */}
          <circle cx="90" cy="92" r="32" fill="#F5C4B3" />
          {/* Ears */}
          <ellipse
            cx="63"
            cy="74"
            rx="13"
            ry="18"
            fill="#D85A30"
            transform="rotate(-12 63 74)"
          />
          <ellipse
            cx="117"
            cy="74"
            rx="13"
            ry="18"
            fill="#D85A30"
            transform="rotate(12 117 74)"
          />
          {/* Snout */}
          <ellipse cx="90" cy="102" rx="14" ry="10" fill="#F0997B" />
          {/* Nose */}
          <ellipse cx="90" cy="97" rx="6" ry="4" fill="#2c2a26" />
          <circle cx="92" cy="95.5" r="1.5" fill="white" opacity="0.7" />
          {/* Eyes */}
          <g className="animate-[blink_4s_ease-in-out_infinite_1.5s]">
            <circle cx="78" cy="88" r="6" fill="#2c2a26" />
            <circle cx="102" cy="88" r="6" fill="#2c2a26" />
            <circle cx="80" cy="86" r="2" fill="white" opacity="0.8" />
            <circle cx="104" cy="86" r="2" fill="white" opacity="0.8" />
          </g>
          {/* Mouth */}
          <path
            d="M84 106 Q90 112 96 106"
            stroke="#2c2a26"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Wagging tail */}
          <g className="animate-[wag_1.4s_ease-in-out_infinite] origin-[127px_124px]">
            <path
              d="M127 124 Q148 110 154 96"
              stroke="#D85A30"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          {/* Paws */}
          <ellipse cx="68" cy="152" rx="12" ry="9" fill="#F0997B" />
          <ellipse cx="112" cy="152" rx="12" ry="9" fill="#F0997B" />
          <line
            x1="65"
            y1="148"
            x2="65"
            y2="157"
            stroke="#D85A30"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="68"
            y1="147"
            x2="68"
            y2="157"
            stroke="#D85A30"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="71"
            y1="148"
            x2="71"
            y2="157"
            stroke="#D85A30"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="109"
            y1="148"
            x2="109"
            y2="157"
            stroke="#D85A30"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="112"
            y1="147"
            x2="112"
            y2="157"
            stroke="#D85A30"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <line
            x1="115"
            y1="148"
            x2="115"
            y2="157"
            stroke="#D85A30"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Shadow */}
          <ellipse
            cx="90"
            cy="165"
            rx="42"
            ry="5"
            fill="#2c2a26"
            opacity="0.06"
          />
        </svg>
      </div>

      {/* Text */}
      <h2
        className="text-[22px] font-extrabold text-gray-800 tracking-tight mb-2"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        No chat selected yet
      </h2>
      <p
        className="text-sm text-gray-400 text-center max-w-[260px] leading-relaxed mb-7"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        Pick a conversation from the left to start chatting with a fellow pet
        lover.
      </p>

      {/* Hint pills */}
      <div className="flex flex-wrap gap-2 justify-center max-w-xs">
        {[
          { label: "Ask about a pet", dot: "bg-emerald-400" },
          { label: "Share adoption stories", dot: "bg-amber-400" },
          { label: "Arrange a meetup", dot: "bg-violet-400" },
        ].map(({ label, dot }) => (
          <span
            key={label}
            className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            <span className={`w-2 h-2 rounded-full ${dot} shrink-0`} />
            {label}
          </span>
        ))}
      </div>
    </main>
  );
};

export default EmptyChatArea;
