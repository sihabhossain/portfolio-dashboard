// hooks/api/skills.hook.ts
import { CreateSkill, deleteSkill, getSkills } from "@/services/skills";
import { TSkill } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateSkill = () => {
  return useMutation<any, Error, TSkill>({
    mutationKey: ["CREATE_SKILL"],
    mutationFn: (skillData) => CreateSkill(skillData),
    onSuccess: () => {
      toast.success("New skill created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["GET_SKILLS"],
    queryFn: () => getSkills(),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};

export const useDeleteSkill = () => {
  return useMutation({
    mutationKey: ["DELETE_SKILL"],
    mutationFn: (_id: string) => deleteSkill(_id),
    onSuccess: () => {
      toast.success("Skill deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
