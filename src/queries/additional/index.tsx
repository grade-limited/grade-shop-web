import instance from "@/service";
import { useQuery } from "@tanstack/react-query";

const getSpeicialities = () => instance.get(`/additional-info/specialities`);

export const useGetSpecialities = () =>
	useQuery(["additional-specialities"], getSpeicialities, {
		select: (data) => data.data || [],
	});

export const previewOccasionImage = (fileName: string | undefined) =>
	`${instance.getUri()}/additional-info/special-occasion/image/${fileName}`;
