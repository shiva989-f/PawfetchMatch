"use client";
import Image from "next/image";
import Navbar from "@/components/Welcome/Navbar";
import Hero from "@/components/Welcome/Hero";
import Story from "@/components/Welcome/Story";

const page = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Story />
    </main>
  );
};

export default page;
