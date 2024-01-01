import instance from "@/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//Get All
const getOrganizations = (params: any) => {
	return instance.get(`/organizations`, {
		params,
	});
};

export const useGetOrganizations = (params: any) => {
	return useQuery(["/organizations", params], () => getOrganizations(params), {
		select(data) {
			return data.data;
		},
	});
};

//Get Using ID
const getOrganizationsById = (id?: string) => {
	return instance.get(`/organizations/${id}`);
};

export const useGetOrganizationsById = (id?: string) => {
	return useQuery(["/organizations/:id", id], () => getOrganizationsById(id), {
		enabled: !!id,
		select(data) {
			return data.data.data;
		},
	});
};

const createEmployeeship = (data: any) => {
	return instance.post("/employeeships", data);
};

export const useCreateEmployeeship = () => {
	const queryClient = useQueryClient();
	return useMutation(createEmployeeship, {
		onSuccess: () => queryClient.invalidateQueries(["validate"]),
	});
};
