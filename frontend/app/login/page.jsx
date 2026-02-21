"use client";
import Image from "next/image";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { LuCircleUser, LuEye, LuEyeClosed } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { errorMessage } from "@/utils/HandleToast";

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;

    if (!email || !password) {
      errorMessage("All fields required!");
      return;
    }

    // TODO: Send to backend
    // await fetch("/api/signup", { method: "POST", body: formData });
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
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
              <MdArrowBack />
              <span>Welcome page</span>
            </button>
          </div>

          <Image
            src="/auth_page.jpeg"
            fill
            alt="Signup page image"
            className="object-cover"
            sizes="50vw"
          />
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 bg-white p-8">
          <div className="text-center">
            <h2 className={`font-bold mb-4 text-4xl text-primary`}>Login</h2>
            <p className="text-xs text-gray-500">
              Let’s get you set up so you can access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="py-2 px-4 border rounded-md"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <div className="flex justify-between items-center py-2 px-4 border rounded-md">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="w-full outline-none pr-2"
                />
                <span
                  className="cursor-pointer"
                  onClick={handlePasswordVisibility}
                >
                  {isPasswordVisible ? <LuEyeClosed /> : <LuEye />}
                </span>
              </div>
            </div>

            <div className="text-xs text-start w-full">
              <Link href={"/forgot-password"} className="text-primary">
                Forgot Password
              </Link>
            </div>

            <button type="submit" className="primary-btn w-full py-2">
              Login
            </button>
            <div className="text-xs text-center w-full">
              Already have an account?{" "}
              <Link href={"/signup"} className="text-primary">
                Signup
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
