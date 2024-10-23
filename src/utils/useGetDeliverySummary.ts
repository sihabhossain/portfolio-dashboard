"use client";

import { ROUTES } from "@/routes/routes";
import { useState, useEffect } from "react";

interface ApiResponse {
  name: string;
  total_quantity: number;
  unit: string;
  total_amount: number;
}

const useGetTodaysDeliverySummary = () => {
  const [data, setData] = useState<ApiResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${ROUTES.DELIVERY_SUMMARY}`;

    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authToken found in localStorage");
        }

        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useGetTodaysDeliverySummary;
