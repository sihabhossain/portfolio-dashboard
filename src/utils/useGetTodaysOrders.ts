"use client";

import { useState, useEffect } from "react";

interface Order {
  id: number;
  user: string;
  delivery_address: string;
  total_amount: number;
  status: string;
  created_at: string;
  zone: string;
}

interface TodaysOrdersResponse {
  zone: string;
  zone_operator: string;
  total_orders: number;
  orders: Order[];
}

interface UseGetTodaysOrder {
  data: TodaysOrdersResponse | null;
  loading: boolean;
  error: string | null;
}

const useGetTodaysOrders = (): UseGetTodaysOrder => {
  const [data, setData] = useState<TodaysOrdersResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log("DATA", data);

  useEffect(() => {
    const fetchTodaysOrders = async () => {
      try {
        setLoading(true);
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Auth token not found in localStorage");
        }

        const response = await fetch(
          "http://192.168.68.113:8000/api/v1/partner/todays_orders",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData: TodaysOrdersResponse = await response.json(); // Ensure data is of type TodaysOrdersResponse
        setData(jsonData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysOrders();
  }, []);

  return { data, loading, error };
};

export default useGetTodaysOrders;
