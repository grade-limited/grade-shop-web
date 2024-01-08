// Note: Cart Query

import instance from "@/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateOrder, ICreateQuotation } from "./types";

//Create Order
const createOrder = (data: ICreateOrder) => {
  return instance.post("/orders", data);
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(createOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
};

//Create Quotation
const createQuotation = (data: ICreateQuotation) => {
  return instance.post("/quotations", data);
};

export const useCreateQuotation = () => {
  const queryClient = useQueryClient();
  return useMutation(createQuotation, {
    onSuccess: () => queryClient.invalidateQueries(["cart-quotation"]),
  });
};
