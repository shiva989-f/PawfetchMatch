"use client";
import Image from "next/image";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { LuCircleUser, LuEye, LuEyeClosed } from "react-icons/lu";
import Link from "next/link";
import { errorMessage } from "@/utils/HandleToast";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    address: {
      city: "",
      state: "",
      country: "",
    },
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setSignupData((prev) => ({ ...prev, profileImage: file }));

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
    // Handle nested address fields
    else if (["city", "state", "country"].includes(name)) {
      setSignupData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setSignupData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      username,
      email,
      address,
      password,
      confirmPassword,
      profileImage,
    } = signupData;

    if (
      !username ||
      !email ||
      !address.city ||
      !address.state ||
      !address.country ||
      !password ||
      !confirmPassword ||
      !profileImage
    ) {
      errorMessage("All fields required!");
      return;
    }

    if (password !== confirmPassword) {
      errorMessage("Passwords do not match!");
      return;
    }

    const formData = new FormData();

    formData.append("file", profileImage);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", JSON.stringify(address));

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
            <h2 className={`font-bold mb-4 text-4xl text-primary`}>Signup</h2>
            <p className="text-xs text-gray-500">
              Let’s get you set up so you can access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Profile Image */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      width={96}
                      height={96}
                      alt="Preview"
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <LuCircleUser className="w-12 h-12 text-gray-500" />
                  )}
                </div>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={signupData.username}
                onChange={handleChange}
                className="py-2 px-4 border rounded-md"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                className="py-2 px-4 border rounded-md"
              />
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  value={signupData.address.city}
                  onChange={handleChange}
                  className="py-2 px-4 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  name="state"
                  value={signupData.address.state}
                  onChange={handleChange}
                  className="py-2 px-4 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  name="country"
                  value={signupData.address.country}
                  onChange={handleChange}
                  className="py-2 px-4 border rounded-md"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <div className="flex justify-between items-center py-2 px-4 border rounded-md">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={signupData.password}
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

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label>Confirm Password</label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleChange}
                className="py-2 px-4 border rounded-md"
              />
            </div>

            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                name="agree"
                id="agree-terms"
                className="accent-primary"
              />
              <span className="text-xs">
                I agree to all the{" "}
                <Link href={"/terms"} className="text-primary">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href={"/privacy-policy"} className="text-primary">
                  Privacy Policies
                </Link>
              </span>
            </div>

            <button type="submit" className="primary-btn w-full py-2">
              Create Account
            </button>
            <div className="text-xs text-center w-full">
              Already have an account?{" "}
              <Link href={"/login"} className="text-primary">
                Login
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Signup;
