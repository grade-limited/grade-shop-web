import instance from "@/service";
import { useQuery } from "@tanstack/react-query";

// Validation function with instance
export const getBrands = (params?: any) => {
	return instance.get("/brands", {
		params,
	});
};

export const useGetBrands = ({
	initialData,
	params,
}: {
	initialData: any;
	params?: any;
}) => {
	return useQuery(["brands", params], () => getBrands(params), {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
	});
};

// Validation function with instance
export const getBrandById = (id: number, params?: any) => {
	return instance.get(`/brands/${id}`, {
		params,
	});
};

export const useGetBrandById = ({
	id,
	initialData,
	params,
}: {
	id: number;
	initialData: any;
	params: any;
}) => {
	return useQuery(["brand", id, params], () => getBrandById(id, params), {
		enabled: !!id,
		select: (data) => data?.data?.data || {},
		placeholderData: initialData,
		initialData: initialData,
	});
};
