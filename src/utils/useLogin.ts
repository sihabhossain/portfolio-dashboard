"use client";

import { ROUTES } from "@/routes/routes";
import { useState } from "react";
import toast from "react-hot-toast";

interface LoginResponse {
  token: string;
  // Add any other response fields here if needed
}

const useLogin = () => {
  const [authToken, setAuthToken] = useState<string>("");

  const login = async (email: string, password: string): Promise<string> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}${ROUTES.LOGIN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data: LoginResponse = await response.json();
      const token: string = data.token;

      // Store token in localStorage
      localStorage.setItem("authToken", token);

      // Set token state
      setAuthToken(token);

      // show toast after user signed in
      toast("Successfully signed in", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      return token;
    } catch (error) {
      toast.error(
        "Login failed. Please check your credentials and try again.",
        {
          duration: 4000,
          style: {
            borderRadius: "10px",
            background: "#ff6347",
            color: "#fff",
          },
        },
      );

      throw error;
    }
  };

  return { login, authToken };
};

export default useLogin;
