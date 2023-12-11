import instance from "@/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createNewsletter = (data: any) => {
  return instance.post("/newsletters", data);
};

export const useCreateNewsletter = () => {
  const queryClient = useQueryClient();
  return useMutation(createNewsletter, {
    onSuccess: () => queryClient.invalidateQueries(["/newsletters"]),
  });
};
