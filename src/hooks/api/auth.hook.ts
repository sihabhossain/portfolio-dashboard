import { LoginUser } from "@/services/auth";
import { TUserData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUserLogin = () => {
  return useMutation<any, Error, TUserData>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: (userData) => LoginUser(userData),
  });
};
