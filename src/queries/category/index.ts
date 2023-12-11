// Instance
import instance from "@/service";

// Third Party
import { useQuery } from "@tanstack/react-query";

// Validation function with instance
export const getSearchCategory = () => {
	return instance.get("/search/category");
};

export const useGetSearchCategory = () => {
	return useQuery(["search-category"], getSearchCategory, {
		select: (data) => data?.data || [],
	});
};

// Validation function with instance
export const getShopCatProd = () => {
	return instance.get("/shop/landing/cat-prod");
};

export const useGetShopCatProd = ({ initialData }: { initialData: any }) => {
	return useQuery(["search-cat-prod"], getShopCatProd, {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
	});
};

// Validation function with instance
export const getCategory = (params?: any) => {
	return instance.get("/categories", {
		params,
	});
};

export const useGetCategory = ({
	initialData,
	params,
}: {
	initialData: any;
	params: any;
}) => {
	return useQuery(["category", params], () => getCategory(params), {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
	});
};

// Validation function with instance
export const getCategoryById = (id: number, params?: any) => {
	return instance.get(`/categories/${id}`, {
		params,
	});
};

export const useGetCategoryById = ({
	id,
	initialData,
	params,
}: {
	id: number;
	initialData: any;
	params: any;
}) => {
	return useQuery(["category", id, params], () => getCategoryById(id, params), {
		enabled: !!id,
		select: (data) => data?.data?.data || {},
		placeholderData: initialData,
		initialData: initialData,
	});
};
