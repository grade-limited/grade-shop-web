// Instance
import instance from "@/service";

// Third Party
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
import { IUserId } from "@/types";

// Login function with instance
const login = (data: any) => {
	return instance.post("/auth/signin", { ...data });
};
export const useLogin = () => {
	return useMutation(login);
};

// Sign Up function with instance
const signup = (data: any) => {
	return instance.post("/auth/signup", {
		...data,
		primary_contact: "phone",
		registered_from: "Website",
	});
};
export const useSignup = () => {
	return useMutation(signup);
};

//Logout function with instance
const logout = () => {
	return instance.delete("/auth/signout");
};
export const useLogout = () => {
	return useMutation(logout);
};

// Validation function with instance
const getValidateUser = () => {
	return instance.get("/auth/validate");
};

export const useGetValidation = (token: string | null) => {
	return useQuery(["validate", token], getValidateUser, {
		enabled: !!token,
		retry: 1,
		onError: async (error: { request: { status: number } }) => {
			return error.request.status;
		},
		// networkMode: "offlineFirst",
	});
};

// User information update

const updateUserInfo = (data: any) => {
	return instance.patch(`/auth/update`, {
		...data,
	});
};

export const useUpdateUserInfo = () => {
	const query = useQueryClient();
	return useMutation([], updateUserInfo, {
		onSuccess: () => {
			query.invalidateQueries(["validate"]);
		},
	});
};

const updatePassword = (data: {
	current_password?: string;
	new_password?: string;
}) => {
	return instance.patch(`/auth/reset-password`, {
		...data,
	});
};

export const useUpdatePassword = () => useMutation(updatePassword);

const sendOTP = (phone: string) =>
	instance.put(`send-otp`, {
		phone,
		type: "User",
	});

export const useSendOTP = () => useMutation(sendOTP);

const verifyOTP = ({ phone, code }: { phone: string; code: string }) =>
	instance.post(`verify-otp`, {
		phone,
		code,
		type: "User",
	});

export const useVerifyOTP = () => useMutation(verifyOTP);

const resetPassword = (data: {
	password: string;
	phone: string;
	token: string;
}) => instance.put(`forget-password`, { ...data, userType: "User" });

export const useResetPassword = () => useMutation(resetPassword);

const registerDevice = ({
	userId,
	deviceId,
}: {
	userId: IUserId;
	deviceId: string | void;
}) =>
	instance.put(
		`/user/update-device/${userId}`,
		{},
		{
			params: {
				deviceId,
			},
		}
	);

export const useRegisterDevice = () => useMutation(registerDevice);
