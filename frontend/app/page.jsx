"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/Store/AuthStore";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Welcome/Navbar";
import Hero from "@/components/Welcome/Hero";
import AdoptionRoadmap from "@/components/Welcome/AdoptionRoadmap";
import Story from "@/components/Welcome/Story";
import Footer from "@/components/Welcome/Footer";

const page = () => {
  const router = useRouter();
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (!isCheckingAuth && isAuthenticated && user?.isVerified) {
      router.replace("/pets");
    }
  }, [isAuthenticated, user, isCheckingAuth]);
  return (
    <div className="font-sans bg-[#FFFDF9] text-[#1a1a1a] min-h-screen">
      <Navbar />
      <Hero />
      <AdoptionRoadmap />
      <Story />
      <Footer />
    </div>
  );
};

export default page;
