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
