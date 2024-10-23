"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { TExperience } from "@/types";

export const CreateExperience = async (expData: TExperience) => {
  try {
    const { data } = await axiosInstance.post("/experience", expData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getExperience = async () => {
  try {
    const { data } = await axiosInstance.get("/experience");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
