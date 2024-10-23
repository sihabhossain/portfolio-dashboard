"use client";

import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../../../public/assets/login-animation.json";
// icons
import { MdOutlineMailLock } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUserLogin } from "@/hooks/api/auth.hook";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  // Use the custom hook to perform login
  const { mutate: loginUser, isPending } = useUserLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare user data object
    const userData = { email, password };

    // Trigger login mutation with user data
    loginUser(userData, {
      onSuccess: () => {
        toast.success("User login successful.");
        router.push("/");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex min-h-screen flex-wrap items-center">
          {/* Lottie Animation */}
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <span className="inline-block">
                <Lottie animationData={animationData} />
              </span>
            </div>
          </div>

          {/* Login Form */}
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-4">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Partner App
              </h2>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Handle input change
                      required
                    />
                    <span className="absolute right-4 top-4">
                      <MdOutlineMailLock size={30} />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Handle input change
                      required
                    />
                    <span className="absolute right-4 top-4">
                      <CiLock size={30} />
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value={isPending ? "Signing In..." : "Sign In"} // Show loading text
                    className={`w-full cursor-pointer rounded-lg border p-4 text-white transition ${
                      isPending ? "bg-primary" : "bg-primary"
                    }`}
                    disabled={isPending}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
