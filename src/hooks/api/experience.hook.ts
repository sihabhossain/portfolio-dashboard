import {
  CreateExperience,
  deleteExp,
  getExperience,
} from "@/services/experience";
import { GetProjects } from "@/services/projects";
import { TExperience } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateExp = () => {
  return useMutation<any, Error, TExperience>({
    mutationKey: ["CREATE_EXP"],
    mutationFn: (expData) => CreateExperience(expData),
    onSuccess: () => {
      toast.success("New exp created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetExp = () => {
  return useQuery({
    queryKey: ["GET_EXP"],
    queryFn: () => getExperience(),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};

export const useDeleteExp = () => {
  return useMutation({
    mutationKey: ["DELETE_BLOG"],
    mutationFn: (_id: string) => deleteExp(_id),
    onSuccess: () => {
      toast.success("Blog deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
