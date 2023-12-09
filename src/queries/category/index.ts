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
