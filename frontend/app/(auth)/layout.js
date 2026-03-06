"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/Store/AuthStore";
import LoadingSpinner from "@/components/LoadingScreen";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-email",
];

export default function AuthLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

    if (!isCheckingAuth && isAuthenticated && user?.isVerified && isAuthRoute) {
      // Go back to where they originally wanted, or fallback to /pets
      const redirectTo =
        sessionStorage.getItem("redirectAfterLogin") || "/pets";
      sessionStorage.removeItem("redirectAfterLogin");
      router.replace(redirectTo);
    }
  }, [isAuthenticated, user, isCheckingAuth, router, pathname]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return children;
}
