import instance from "@/service";
import { useMutation } from "@tanstack/react-query";

// Sign Up function with instance
const request = (data: any) => {
	return instance.post("/vendor-request", {
		...data,
		type: "Vendor",
		userName: data.name,
	});
};
export const useRequest = () => {
	return useMutation(request);
};
