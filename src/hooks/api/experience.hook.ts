import { CreateExperience } from "@/services/experience";
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
    queryFn: () => GetProjects(),
  });
};
