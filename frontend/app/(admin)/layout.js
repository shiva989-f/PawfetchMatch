"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/Store/AuthStore";
import LoadingSpinner from "@/components/LoadingScreen";
import { errorMessage } from "@/utils/HandleToast";

export default function PetsLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (isCheckingAuth) return;

    // Not logged in
    if (!isAuthenticated) {
      if (pathname !== "/admin/signup") {
        router.replace("/admin/signup");
      }
      return;
    }

    // Logged in but NOT admin
    if (user?.role !== "admin") {
      errorMessage("You are not authorized for admin panel");
      router.replace("/login");
      return;
    }

    // Admin but not verified
    if (!user?.isVerified) {
      errorMessage("Please verify your account");
      router.replace("/login");
      return;
    }

    // Admin logged in
    if (pathname === "/admin/signup") {
      // Prevent admin from going back to signup
      router.replace("/admin/dashboard");
    }
  }, [isAuthenticated, user, isCheckingAuth, pathname, router]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return children;
}
