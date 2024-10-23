"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { TProject } from "@/types";

export const CreateProject = async (projectData: TProject) => {
  try {
    const { data } = await axiosInstance.post("/projects", projectData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetProjects = async () => {
  try {
    const { data } = await axiosInstance.get("/projects");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteProject = async (_id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/projects/${_id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
