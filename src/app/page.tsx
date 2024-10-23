"use client";

import HomePage from "@/components/Dashboard/E-commerce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if authToken is present in localStorage
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      // If no authToken, redirect the user to the login page
      router.push("/auth/signin");
    } else {
      // If authToken is present, set isLoggedIn to true
      setIsLoggedIn(true);
    }
  }, []);

  // Render the ECommerce component if isLoggedIn is true
  return isLoggedIn ? <HomePage /> : null;
}
