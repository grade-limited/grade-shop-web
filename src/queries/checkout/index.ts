// Note: Cart Query

import instance from "@/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get Carts
const getOrders = () => instance.get(`/orders`);
export const useGetOrders = () => {
  return useQuery(["carts"], getOrders, {
    select(data) {
      return data.data;
    },
  });
};
