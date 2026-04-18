import { alkatra } from "@/app/font";
import { useEffect, useRef, useState } from "react";

const useCounter = (end, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
};

const StatsBar = () => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const dogs = useCounter(5000, 1800, started);
  const cats = useCounter(6000, 1800, started);
  const birds = useCounter(7500, 1800, started);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fmt = (n) =>
    n >= 1000 ? (n / 1000).toFixed(1).replace(".0", "") + "k+" : n + "+";

  return (
    <div
      ref={ref}
      className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 z-10"
    >
      {[
        {
          val: fmt(dogs),
          label: "Happy Dogs",
          emoji: "🐕",
          color: "text-[#FF9500]",
        },
        {
          val: fmt(cats),
          label: "Loving Cats",
          emoji: "🐱",
          color: "text-[#AF52DE]",
        },
        {
          val: fmt(birds),
          label: "Joyful Birds",
          emoji: "🐦",
          color: "text-[#5856D6]",
        },
      ].map((s, i) => (
        <div
          key={i}
          className="bg-white rounded-[20px] py-6 px-7 flex items-center gap-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-black/5"
        >
          <span className="text-[36px]">{s.emoji}</span>
          <div>
            <p
              className={`${alkatra.className} m-0 text-[28px] font-extrabold font-serif tracking-tight ${s.color}`}
            >
              {s.val}
            </p>
            <p className="m-0 text-[13px] text-[#888] font-medium">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
