import instance from "@/service";
import { IReservationId, IVendorId } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getReservationById = (reservationId: IReservationId | any) =>
	instance.get(`/reservation/${reservationId}`);

export const useGetReservationById = (reservationId: IReservationId | any) =>
	useQuery(
		["reservation", reservationId],
		() => getReservationById(reservationId),
		{
			enabled: !!reservationId,
			select: (data) => data?.data?.data,
		}
	);

// Find blank slots with instance
const findSlot = (data: {
	vendorId: IVendorId;
	date: string;
	count: string;
}) => {
	return instance.get(`/reservation/${data.vendorId}/schedule`, {
		params: {
			date: data.date,
			count: data.count,
		},
	});
};
export const useFindSlot = () => {
	return useMutation(findSlot);
};

export const getOccasions = () =>
	instance.get(`/additional-info/special-occasions`);

export const useGetOccasions = ({ initialData }: { initialData: any }) =>
	useQuery(["special-occasions"], () => getOccasions(), {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
		enabled: false,
	});

export const useMakeReservation = () =>
	useMutation(({ data }: any) => {
		return instance.post("/reservation", { ...data });
	});

const PostReview = (data: {
	vendorID: IReservationId;
	reservationID: IReservationId;
	rating: number;
	review: string;
}) => instance.put("/reservation/review", data);

export const usePostReview = () => {
	const query = useQueryClient();
	return useMutation(PostReview, {
		onSuccess: () => {
			query.invalidateQueries(["Reservation-List"]);
		},
	});
};

const CancelReservation = (reservationID: IReservationId) =>
	instance.put(`/reservation/${reservationID}/cancel`);

export const useCancelReservation = () => {
	const query = useQueryClient();
	return useMutation(CancelReservation, {
		onSuccess: () => {
			query.invalidateQueries(["reservation"]);
			query.invalidateQueries(["Reservation-List"]);
		},
	});
};
