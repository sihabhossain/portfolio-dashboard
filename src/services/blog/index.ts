"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { TBlogPost, TExperience } from "@/types";

export const CreateBlog = async (blogData: TBlogPost) => {
  try {
    const { data } = await axiosInstance.post("/blogs", blogData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getBlog = async () => {
  try {
    const { data } = await axiosInstance.get("/blogs");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteBlog = async (_id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/blogs/${_id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
