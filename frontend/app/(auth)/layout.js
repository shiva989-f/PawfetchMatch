"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/Store/AuthStore";
import LoadingSpinner from "@/components/LoadingScreen";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (!isCheckingAuth && isAuthenticated && user?.isVerified) {
      router.replace("/pets");
    }
  }, [isAuthenticated, user, isCheckingAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return children;
}
