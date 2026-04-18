"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { alkatra } from "@/app/font";

const Navbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-300 ease-in-out ${scrolled ? "py-3 px-6 md:px-12 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-black/5" : "py-5 px-6 md:px-12 bg-transparent"}`}
    >
      <div className="flex items-center gap-2">
        <Image
          src={"/logo.png"}
          width={28}
          height={28}
          alt="logo"
          className="invert-100"
        />
        <span
          className={`font-serif text-[26px] font-bold tracking-tight text-[#1a1a1a] ${alkatra.className}`}
        >
          Pawfect
          <span className={`text-[#FF6B6B] ${alkatra.className}`}>.</span>
        </span>
      </div>
      <nav className="flex items-center gap-3">
        <button
          className="px-5.5 py-2.5 bg-transparent border-[1.5px] border-black/15 rounded-full text-sm font-medium text-[#1a1a1a] hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-colors duration-200 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Log in
        </button>
        <button
          className="px-5.5 py-2.5 bg-[#FF6B6B] rounded-full text-sm font-semibold text-white shadow-[0_4px_16px_rgba(255,107,107,0.35)] hover:bg-[#e85555] hover:-translate-y-px transition-all duration-200 cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          Sign up →
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
