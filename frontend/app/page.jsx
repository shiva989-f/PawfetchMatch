"use client";
import Navbar from "@/components/Welcome/Navbar";
import Hero from "@/components/Welcome/Hero";
import Story from "@/components/Welcome/Story";
import AdoptionRoadmap from "@/components/Welcome/AdoptionRoadmap";

const page = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Story />
      <AdoptionRoadmap />
    </main>
  );
};

export default page;
