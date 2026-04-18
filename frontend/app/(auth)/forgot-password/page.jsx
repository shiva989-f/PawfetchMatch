"use client";
import { useAuthStore } from "@/Store/AuthStore";
import { errorMessage } from "@/utils/HandleToast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSendLink = () => {
    if (!email) {
      errorMessage("Email is required!");
      return;
    }
    authStore.forgotPassword(email);
  };
  return (
    <main>
      <section className="relative flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden">
        {/* Left */}
        <div className="relative w-full md:w-1/2 min-h-screen">
          <div className="absolute top-0 left-0 w-full py-2 px-4 z-10 flex justify-between items-center">
            <span className="text-base sm:text-xl font-bold text-white bg-black/10 rounded-2xl px-4">
              Pawfect<span className="text-primary">.</span>
            </span>
            <button
              className="primary-btn flex items-center gap-2 py-1 sm:py-2 px-2 sm:px-4 text-xs"
              onClick={() => router.push("/")}
            >
              <IoIosArrowBack />
              <span>Welcome page</span>
            </button>
          </div>

          <Image
            src="/auth_page.jpeg"
            fill
            loading="eager"
            alt="Forgot password page image"
            className="object-cover"
            sizes="50vw"
          />
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 bg-white p-8">
          <div className="flex flex-col gap-2 justify-center items-center">
            <MdEmail className="w-16 h-16 text-primary" />
            <h2 className={`font-bold mb-4 text-2xl`}>Forgot Password?</h2>
          </div>

          <div className="mt-8 space-y-4">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 px-4 border rounded-md border-primary"
              />
            </div>

            <button
              type="submit"
              className="primary-btn w-full py-2"
              onClick={handleSendLink}
            >
              {authStore.isLoading ? (
                <FaCircleNotch className="animate-spin text-lg" />
              ) : (
                "Send Link"
              )}
            </button>
            <div className="text-xs text-center w-full">
              <Link
                href={"/login"}
                className="flex gap-2 items-center justify-center"
              >
                <IoIosArrowBack />
                <span>Back to Login</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
