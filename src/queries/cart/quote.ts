// Note: Cart Quote Query

import instance from "@/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get Carts
const getCarts = () => instance.get(`/cart-quotation`);
export const useGetCarts = () => {
	return useQuery(["cart-quotation"], getCarts, {
		select(data) {
			return data.data;
		},
	});
};

// Add To Cart
const addToCart = (data: any) => instance.post("/cart-quotation", data);
export const useAddToCart = () => {
	const queryClient = useQueryClient();
	return useMutation(addToCart, {
		onSuccess: () => queryClient.invalidateQueries(["cart-quotation"]),
	});
};

// Update Cart
const updateCart = ({ id, data }: { id: number; data: any }) =>
	instance.patch(`/cart-quotation/${id}`, data);
export const useUpdateCart = () => {
	const queryClient = useQueryClient();
	return useMutation(updateCart, {
		onSuccess: () => queryClient.invalidateQueries(["cart-quotation"]),
	});
};

// Delete Cart
const deleteCart = (id: number) => instance.delete(`/cart-quotation/${id}`);
export const useDeleteCart = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteCart, {
		onSuccess: () => queryClient.invalidateQueries(["cart-quotation"]),
	});
};
