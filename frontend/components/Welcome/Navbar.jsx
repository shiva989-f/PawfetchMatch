import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);


const Navbar = () => {
  
  const navRef = useRef(null);

useGSAP(() => {
  gsap.from(navRef.current, {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
}, []);


  return (
    <header className="py-8">
      <nav ref = {navRef} className="flex justify-between items-center">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
          Pawfect<span className="text-secondary">.</span>
        </h1>

        <div className="btn-container">
          <button className="primary-btn">Sign up</button>

          <button className="secondary-btn">Login</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
