import instance from "@/service";
import { IVendorId } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const getPopularRestaurant = ({
	params: { location = "  ", pageNumber = 1, pageSize = 10 },
}: {
	params: {
		location?: string | string[];
		pageNumber?: number | string | string[];
		pageSize?: number | string | string[];
	};
}) =>
	instance.get(`restaurant-list/popular-in-town`, {
		params: {
			location,
			pageNumber,
			pageSize,
		},
	});

export const useGetPopularRestaurant = ({
	initialData,
	params,
}: {
	initialData: any;
	params: {
		location?: string | string[];
		pageNumber?: number | string | string[];
		pageSize?: number | string | string[];
	};
}) =>
	useQuery(
		["popular-in-town", params],
		() => getPopularRestaurant({ params }),
		{
			select: (data) => data?.data?.data || { data: [], totalCount: 0 },
			placeholderData: initialData,
			initialData: initialData,
			enabled: false,
		}
	);

export const getNewRestaurant = ({
	params: { location = "  ", pageNumber = 1, pageSize = 10 },
}: {
	params: {
		location?: string | string[];
		pageNumber?: number | string | string[];
		pageSize?: number | string | string[];
	};
}) =>
	instance.get(`restaurant-list/new-in-town`, {
		params: {
			location,
			pageNumber,
			pageSize,
		},
	});

export const useGetNewRestaurant = ({
	initialData,
	params,
}: {
	initialData: any;
	params: {
		location?: string | string[];
		pageNumber?: number | string | string[];
		pageSize?: number | string | string[];
	};
}) =>
	useQuery(["new-in-town", params], () => getNewRestaurant({ params }), {
		select: (data) => data?.data?.data || { data: [], totalCount: 0 },
		placeholderData: initialData,
		initialData: initialData,
		enabled: false,
	});

export const previewRestaurantImage = (
	vendorId?: IVendorId,
	fileName?: string
) => `${instance.getUri()}/restaurant-profile/${vendorId}/file/${fileName}`;

export const previewFoodMenuImage = (vendorId: IVendorId, fileName: string) =>
	`${instance.getUri()}/restaurant-profile/${vendorId}/menu/image/${fileName}`;
