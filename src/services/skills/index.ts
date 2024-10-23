// services/skills.ts
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { TSkill } from "@/types";

export const CreateSkill = async (skillData: TSkill) => {
  try {
    const { data } = await axiosInstance.post("/skills", skillData);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSkills = async () => {
  try {
    const { data } = await axiosInstance.get("/skills");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteSkill = async (_id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/skills/${_id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
