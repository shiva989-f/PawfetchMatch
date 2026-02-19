import { baloo_bhaijaan_2 } from "@/app/font";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <section>
      <div className="footer-upper">
        <div className="footer-header-text">
          <h2 className="text-4xl font-bold">Hearts & Paws</h2>
          <p className="opacity-70 text-xl">Adopt Love. Save Lives.</p>
        </div>
        <div className="relative">
          <div
            className={`${baloo_bhaijaan_2.className} font-black text-center text-white text-[250px] opacity-70 tracking-wide`}
          >
            adopt
          </div>

          <Image
            src="/facecat.png"
            alt="Cat Face"
            width={500}
            height={500}
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>

      <div className="text-center py-8 bg-white rounded-bl-2xl rounded-br-2xl">
        <p>Millions of loving pets are waiting for a forever home.</p>
        <p>
          By adopting, you give a pet a second chance and bring unconditional
          love and joy into your life.
        </p>
      </div>

      <div className="text-center my-4">
        <p className="text-base text-gray-400">
          Made with 💖 by Shiva and Pankaj
        </p>
      </div>
    </section>
  );
};

export default Footer;
