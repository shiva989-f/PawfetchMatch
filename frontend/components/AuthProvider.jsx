// components/AuthProvider.jsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/Store/AuthStore";
import LoadingSpinner from "./LoadingScreen";

export default function AuthProvider({ children }) {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return children;
}
