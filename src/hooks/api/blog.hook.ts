import { CreateBlog, deleteBlog, getBlog } from "@/services/blog";
import { TBlogPost } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateBlog = () => {
  return useMutation<any, Error, TBlogPost>({
    mutationKey: ["CREATE_BLOG"],
    mutationFn: (blogData) => CreateBlog(blogData),
    onSuccess: () => {
      toast.success("New blog created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetBlog = () => {
  return useQuery({
    queryKey: ["GET_BLOG"],
    queryFn: () => getBlog(),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};

export const useDeleteBlog = () => {
  return useMutation({
    mutationKey: ["DELETE_BLOG"],
    mutationFn: (_id: string) => deleteBlog(_id),
    onSuccess: () => {
      toast.success("Blog deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
