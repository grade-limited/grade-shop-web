// Instance
import instance from "@/service";

// Third Party
import { useQuery } from "@tanstack/react-query";

// Validation function with instance
export const getCampaigns = () => {
	return instance.get("/campaigns", {
		params: {
			// is_active: true,
		},
	});
};

export const useGetCampaigns = ({ initialData }: { initialData: any }) => {
	return useQuery(["campaigns"], getCampaigns, {
		select: (data) => data?.data || [],
		placeholderData: initialData,
		initialData: initialData,
	});
};
