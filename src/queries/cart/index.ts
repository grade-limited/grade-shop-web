// Note: Cart Query

import instance from "@/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get Carts
const getCarts = () => instance.get(`/carts`);
export const useGetCarts = () => {
  return useQuery(["carts"], getCarts, {
    select(data) {
      return data.data;
    },
  });
};

// Add To Cart
const addToCart = (data: any) => instance.post("/carts", data);
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation(addToCart, {
    onSuccess: () => queryClient.invalidateQueries(["carts"]),
  });
};

// Update Cart
const updateCart = ({ id, data }: { id: number; data: any }) =>
  instance.patch(`/carts/${id}`, data);
export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCart, {
    onSuccess: () => queryClient.invalidateQueries(["carts"]),
  });
};

// Delete Cart
const deleteCart = (id: number) => instance.delete(`/carts/${id}`);
export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCart, {
    onSuccess: () => queryClient.invalidateQueries(["carts"]),
  });
};
