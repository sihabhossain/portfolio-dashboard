"use client";
import Cookies from "js-cookie";
import { ROUTES } from "@/routes/routes";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import toast from "react-hot-toast";

const useLogout = () => {
  const router = useRouter(); // Initialize the useRouter hook

  const logout = async (): Promise<void> => {
    try {
      // Retrieve the authToken from localStorage
      const authToken = Cookies.get("accessToken");

      // If authToken is not found, do nothing
      if (!authToken) return;

      // Remove the authToken from localStorage
      Cookies.remove("accessToken");

      //   show toast after user signed out
      toast("Successfully signed out", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      // Redirect the user to the "/auth/signin" route after successful logout
      router.push("/auth/signin");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout failure here
    }
  };

  return logout;
};

export default useLogout;
