"use client";
import Navbar from "@/components/Welcome/Navbar";
import Hero from "@/components/Welcome/Hero";
import Story from "@/components/Welcome/Story";
import AdoptionRoadmap from "@/components/Welcome/AdoptionRoadmap";
import Footer from "@/components/Welcome/Footer";

const page = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Story />
      <AdoptionRoadmap />
      <Footer />
    </main>
  );
};

export default page;
