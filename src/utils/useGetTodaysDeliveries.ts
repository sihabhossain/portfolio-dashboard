"use client";

import { useState, useEffect } from "react";

interface Delivery {
  id: number;
  user: string;
  delivery_address: string;
  total_amount: number;
  status: string;
  created_at: string;
  zone: string;
}

interface TodaysDeliveriesResponse {
  zone: string;
  zone_operator: string;
  total_orders: number;
  orders: Delivery[];
}

interface useGetTodaysDelivery {
  data: TodaysDeliveriesResponse | null;
  loading: boolean;
  error: string | null;
}

const useGetTodaysDeliveries = (): useGetTodaysDelivery => {
  const [data, setData] = useState<TodaysDeliveriesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log("DATA", data);

  useEffect(() => {
    const fetchTodaysDeliveries = async () => {
      try {
        setLoading(true);
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Auth token not found in localStorage");
        }

        const response = await fetch(
          "http://192.168.68.113:8000/api/v1/partner/todays_delivery",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData: TodaysDeliveriesResponse = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysDeliveries();
  }, []);

  return { data, loading, error };
};

export default useGetTodaysDeliveries;
