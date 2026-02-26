"use client";
import Navbar from "@/components/Welcome/Navbar";
import Hero from "@/components/Welcome/Hero";
import Story from "@/components/Welcome/Story";
import AdoptionRoadmap from "@/components/Welcome/AdoptionRoadmap";
import Footer from "@/components/Welcome/Footer";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/Store/AuthStore";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (!isCheckingAuth && isAuthenticated && user?.isVerified) {
      router.replace("/pets");
    }
  }, [isAuthenticated, user, isCheckingAuth]);
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
