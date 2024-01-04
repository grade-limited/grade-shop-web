// Note: Cart Quote Query

import instance from "@/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get Carts
const getQuoteCarts = () => instance.get(`/cart-quotation`);
export const useGetQuoteCarts = () => {
  return useQuery(["cart-quotation"], getQuoteCarts, {
    select(data) {
      return data.data;
    },
  });
};

// Add To Cart
const addToQuoteCart = (data: any) => instance.post("/cart-quotation", data);
export const useAddToQuoteCart = () => {
  const queryClient = useQueryClient();
  return useMutation(addToQuoteCart, {
    onSuccess: () => queryClient.invalidateQueries(["cart-quotation"]),
  });
};

// Update Cart
const updateQuoteCart = ({ id, data }: { id: number; data: any }) =>
  instance.patch(`/cart-quotation/${id}`, data);
export const useUpdateQuoteCart = () => {
  const queryClient = useQueryClient();
  return useMutation(updateQuoteCart, {
    onSuccess: () => queryClient.invalidateQueries(["cart-quotation"]),
  });
};

// Delete Cart
const deleteQuoteCart = (id: number) =>
  instance.delete(`/cart-quotation/${id}`);
export const useDeleteQuoteCart = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteQuoteCart, {
    onSuccess: () => queryClient.invalidateQueries(["cart-quotation"]),
  });
};
