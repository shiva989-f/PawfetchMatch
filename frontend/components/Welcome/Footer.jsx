import React from "react";
import { PawIcon } from "../SvgIcons";
import { FaArrowRight } from "react-icons/fa";
import { alkatra } from "@/app/font";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="bg-[#1a1a1a] pt-20 px-6 md:px-12 pb-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <PawIcon size={28} className="text-[#FF6B6B]" />
              <span className="font-serif text-[26px] font-bold">
                Pawfect<span className="text-[#FF6B6B]">.</span>
              </span>
            </div>
            <p className="text-[#888] text-[15px] leading-relaxed max-w-70">
              Connecting hearts and paws. Millions of loving pets are waiting
              for a forever home.
            </p>
            <div className="flex gap-2.5 mt-6">
              {["🐾 Adopt", "💌 Contact"].map((t) => (
                <button
                  key={t}
                  className="py-2 px-4 bg-white/5 border border-white/10 rounded-full text-[#aaa] text-[13px] cursor-pointer hover:bg-white/10 hover:text-white transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {[
            {
              title: "Platform",
              subTitle: [
                "Browse Pets",
                "Post Animal",
                "Adoption Requests",
                "Stories",
              ],
              links: ["login", "login", "login", "login"],
            },
            {
              title: "Support",
              subTitle: ["Help Center", "Safety Tips", "Community", "Report"],
              links: ["help", "safety", "community", "report"],
            },
            {
              title: "Legal",
              subTitle: [
                "Privacy Policy",
                "Terms of Use",
                "Cookie Policy",
                "Licenses",
              ],
              links: ["privacy-policy", "terms", "cookie-policy", "licenses"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="m-0 mb-4 text-[13px] font-semibold tracking-wide text-[#666] uppercase">
                {col.title}
              </h4>
              {col.subTitle.map((s, i) => (
                <p
                  key={s}
                  className="m-0 mb-3 text-sm text-[#888] cursor-pointer transition-colors duration-200 hover:text-[#FF6B6B]"
                  onClick={() => router.push(`/${col.links[i]}`)}
                >
                  {s}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-linear-to-br from-[#FF6B6B] to-[#FF9500] rounded-3xl py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div>
            <h3
              className={`m-0 mb-2 font-serif text-[28px] font-bold text-white ${alkatra.className}`}
            >
              Ready to find your companion?
            </h3>
            <p className="m-0 text-white/85 text-[15px]">
              Join thousands of happy families who adopted through Pawfect.
            </p>
          </div>
          <button className="bg-white text-[#FF6B6B] border-none rounded-full py-3.5 px-7 text-[15px] font-bold cursor-pointer shrink-0 flex items-center gap-2 hover:bg-gray-100 transition-colors" onClick={()=> router.push("/login")}>
            Start Adopting <FaArrowRight />
          </button>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-6 text-[#555] text-[13px]">
          <p className="m-0">© 2025 Pawfect. All rights reserved.</p>
          <p className="m-0">Made with 💖 by Shiva and Pankaj</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
