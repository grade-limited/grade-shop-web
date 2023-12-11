import instance from "@/service";
import { useQuery } from "@tanstack/react-query";

// Validation function with instance
export const getProducts = (params?: any) => {
	return instance.get("/products", {
		params,
	});
};

export const useGetProducts = ({
	initialData,
	params,
}: {
	initialData: any;
	params: any;
}) => {
	return useQuery(["products", params], () => getProducts(params), {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
	});
};

export const getProductById = (id: number, params?: any) => {
	return instance.get(`/shop/product/${id}`, {
		params,
	});
};

export const useGetProductById = ({
	id,
	initialData,
	params,
}: {
	id: number;
	initialData: any;
	params: any;
}) => {
	return useQuery(["product", id, params], () => getProductById(id, params), {
		enabled: !!id,
		select: (data) => data?.data?.data || {},
		placeholderData: initialData,
		initialData: initialData,
	});
};
