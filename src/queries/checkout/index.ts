// Note: Cart Query

import instance from "@/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateOrder } from "./types";

//Create Order
const createOrder = (data: ICreateOrder) => {
  return instance.post("/orders", data);
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(createOrder, {
    onSuccess: () => queryClient.invalidateQueries(["/orders"]),
  });
};
