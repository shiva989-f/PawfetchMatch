"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/Store/AuthStore";
import LoadingSpinner from "@/components/LoadingScreen";

export default function PetsLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (!isCheckingAuth && (!isAuthenticated || !user?.isVerified)) {
      // Save where user wanted to go
      sessionStorage.setItem("redirectAfterLogin", pathname);
      router.replace("/login");
    }
  }, [isAuthenticated, user, isCheckingAuth, router, pathname]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user?.isVerified) {
    return null;
  }

  return children;
}
