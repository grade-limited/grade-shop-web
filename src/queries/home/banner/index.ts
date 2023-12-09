import instance from "@/service";
import { useQuery } from "@tanstack/react-query";

export const getBanners = () => instance.get("banners/Banner");

export const useGetBanners = ({ initialData }: { initialData: any }) =>
	useQuery(["banners"], getBanners, {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
		enabled: false,
	});

export const previewBanner = (fileName: string) =>
	`${instance.getUri()}/banner/${fileName}`;
