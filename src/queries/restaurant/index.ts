import instance from "@/service";
import { ISpecialityId, IVendorId } from "@/types";
import { useQuery } from "@tanstack/react-query";

//get restaurant profile overview

export const getOverview = (vendorId: IVendorId) =>
	instance.get(`/restaurant-profile/${vendorId}/overview`);

export const useGetOverview = ({
	initialData,
	vendorId,
}: {
	initialData: any;
	vendorId: IVendorId;
}) =>
	useQuery(["restaurant-overview"], () => getOverview(vendorId), {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
		enabled: false,
	});

export const previewSpecialitiesImage = (id: ISpecialityId) =>
	`${instance.getUri()}/additional-info/speciality/icon/${id}`;

//get contact details

export const getContact = (vendorId: IVendorId) =>
	instance.get(`/restaurant-profile/${vendorId}/contact`);

export const useGetContact = ({
	initialData,
	vendorId,
}: {
	initialData: any;
	vendorId: IVendorId;
}) =>
	useQuery(["restaurant-contact"], () => getContact(vendorId), {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
		enabled: false,
	});

//get gallery

export const getGallery = (vendorId: IVendorId) =>
	instance.get(`/restaurant-profile/${vendorId}/gallery`);

export const useGetGallery = ({
	initialData,
	vendorId,
}: {
	initialData: any;
	vendorId: IVendorId;
}) =>
	useQuery(["restaurant-Gallery"], () => getGallery(vendorId), {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
		enabled: false,
	});

//get shcedules

export const getSchedule = (vendorId: IVendorId) =>
	instance.get(`/restaurant-profile/${vendorId}/schedule`);

export const useGetSchedule = ({
	initialData,
	vendorId,
}: {
	initialData: any;
	vendorId: IVendorId;
}) =>
	useQuery(["restaurant-schedule"], () => getSchedule(vendorId), {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
		enabled: false,
	});

//get notes

export const getNotes = (vendorId: IVendorId) =>
	instance.get(`/restaurant-profile/${vendorId}/notes`);

export const useGetNotes = ({
	initialData,
	vendorId,
}: {
	initialData: any;
	vendorId: IVendorId;
}) =>
	useQuery(["restaurant-notes"], () => getNotes(vendorId), {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
		enabled: false,
	});

//get menu foods list

export const getMenuFoods = (vendorId: IVendorId) =>
	instance.get(`/restaurant-profile/${vendorId}/menu/foods`);

export const useGetMenuFoods = ({
	initialData,
	vendorId,
}: {
	initialData: any;
	vendorId: IVendorId;
}) =>
	useQuery(["restaurant-menu-foods"], () => getMenuFoods(vendorId), {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
		enabled: false,
	});

//get menu reviews

export const getReviews = (vendorId: IVendorId) =>
	instance.get(`/reservation/reviews/${vendorId}`);

export const useGetReviews = ({
	initialData,
	vendorId,
}: {
	initialData: any;
	vendorId: IVendorId;
}) =>
	useQuery(["restaurant-reviews"], () => getReviews(vendorId), {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
		enabled: false,
	});
