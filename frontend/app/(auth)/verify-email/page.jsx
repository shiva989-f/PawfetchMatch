"use client";
import { FaCircleNotch } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { IoIosArrowBack, IoMdMail } from "react-icons/io";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/Store/AuthStore";
import Image from "next/image";

const OTP = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(600); // 600 is seconds which is 10 min
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!authStore.user) {
      router.replace("/signup");
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;
    const res = await authStore.verifyEmail({ otp: code });
    console.log(res);
    console.log(authStore.user);

    if (res.success || authStore.isAuthenticated) {
      // router.push("/pets");
      console.log(res);
      console.log(authStore.user);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // * If user is verified then show this page
  if (authStore.user?.isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCircleNotch className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-nunito-bold text-gray-900 mb-4">
            Verified Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Welcome to Pawfect. Your account is now verified and ready to use.
          </p>
          <button className="primary-btn" onClick={() => router.push("/pets")}>
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden w-full max-w-md relative">
        {/* Header with logo area */}
        <div className="bg-primary p-6 text-center relative">
          <div className="absolute top-4 left-4">
            <button
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => router.push("/signup")}
            >
              <IoIosArrowBack className="w-6 h-6" />
            </button>
          </div>

          {/* Pawfect Logo */}
          <div className="flex items-center justify-center mb-2">
            <div className="w-16 h-16 backdrop-blur-sm rounded-xl flex items-center justify-center mr-2">
              <Image width={50} height={50} src="/logo.png" alt="Logo" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">Pawfect</h1>
              <p className="text-white/80 text-xs">Adopt Love. Save Lives</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-8">
          {/* Icon */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 shadow-lg">
              <BsFillShieldLockFill className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-nunito-bold text-gray-900 mb-2">
              Verify Your Account
            </h2>
            <p className="text-gray-600">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-primary font-semibold flex items-center justify-center mt-1">
              <IoMdMail className="w-4 h-4 mr-2" />
              {authStore.user?.email || "user@mail.com"}
            </p>
          </div>

          {/* OTP Input */}
          <div className="mb-8">
            <div className="flex justify-center space-x-3 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-nunito-bold border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200 bg-gray-50 focus:bg-white"
                  inputMode="numeric"
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center">
              {timer > 0 ? (
                <p className="text-gray-500 text-sm">
                  Code expires in{" "}
                  <span className="font-semibold text-primary">
                    {formatTime(timer)}
                  </span>
                </p>
              ) : (
                <p className="text-red-500 text-sm font-medium">Code expired</p>
              )}
            </div>
            {/* Verify Button */}
          </div>

          <div className="w-full ">
            <button
              onClick={handleVerify}
              disabled={otp.join("").length !== 6 || authStore.isLoading}
              className="primary-btn w-full"
            >
              Verify
            </button>
          </div>

          {/* Help text */}
          <div className="mt-6 p-4 rounded-xl border border-purple-100">
            <p className="text-xs text-gray-600 text-center">
              Having trouble? Check your spam folder or contact our support team
              for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
