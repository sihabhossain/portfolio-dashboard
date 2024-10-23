"use client";

import HomePage from "@/components/Dashboard/E-commerce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Correct import for js-cookie

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if authToken is present in Cookies
    const authToken = Cookies.get("accessToken");

    if (!authToken) {
      // If no authToken, redirect the user to the login page
      router.push("/auth/signin");
    } else {
      // If authToken is present, set isLoggedIn to true
      setIsLoggedIn(true);
    }
  }, [router]);

  // Render the ECommerce component if isLoggedIn is true
  return isLoggedIn ? <HomePage /> : null;
}
