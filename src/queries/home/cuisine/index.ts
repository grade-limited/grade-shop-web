import instance from "@/service";
import { useQuery } from "@tanstack/react-query";

export const getCuisines = () =>
	instance.get(`additional-info/cuisine-catagories`);

export const useGetCuisines = ({ initialData }: { initialData: any }) =>
	useQuery(["restaurant-menu-category"], getCuisines, {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
		enabled: false,
	});

export const previewMenuCategoryImage = (fileName: string) =>
	`${instance.getUri()}/additional-info/cuisine-catagory/image/${fileName}`;
