import { CreateProject, deleteProject, GetProjects } from "@/services/projects";
import { TProject } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateProject = () => {
  return useMutation<any, Error, TProject>({
    mutationKey: ["CREATE_PROJECT"],
    mutationFn: (projectData) => CreateProject(projectData),
    onSuccess: () => {
      toast.success("Project created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["GET_PROJECTS"],
    queryFn: () => GetProjects(),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};

export const useDeleteProject = () => {
  return useMutation({
    mutationKey: ["DELETE_BLOG"],
    mutationFn: (_id: string) => deleteProject(_id),
    onSuccess: () => {
      toast.success("Project deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
