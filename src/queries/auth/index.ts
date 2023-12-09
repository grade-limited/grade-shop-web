// Instance
import instance from "@/service";

// Third Party
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
import { ILogin, ISignup, IUpdateUser } from "./types";
import { IUserId, IVendorId } from "@/types";

// Login function with instance
const login = (data: ILogin) => {
	return instance.post("/login", { ...data, type: "User" });
};
export const useLogin = () => {
	return useMutation(login);
};

// Sign Up function with instance
const signup = (data: ISignup) => {
	return instance.post("/signup", { ...data, type: "User" });
};
export const useSignup = () => {
	return useMutation(signup);
};

//Logout function with instance
const logout = () => {
	return instance.put("/logout");
};
export const useLogout = () => {
	return useMutation(logout);
};

// Validation function with instance
const getValidateUser = () => {
	return instance.get("/currentuser");
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

// User information with user id
const getUserInfo = (userId: IUserId) => {
	return instance.get(`/user/info/${userId}`);
};

export const useGetUserInfo = (userId: IUserId) =>
	useQuery(["user", userId], () => getUserInfo(userId), {
		enabled: !!userId,
		refetchOnWindowFocus: false,
	});

// User information with user id
const getUserInfo2 = (userId: IUserId) => {
	return instance.get(`/user/${userId}`);
};

export const useGetUserInfo2 = (userId: IUserId) =>
	useQuery(["user-2", userId], () => getUserInfo2(userId), {
		enabled: !!userId,
		refetchOnWindowFocus: false,
	});

// Referral Code get
const getReferral = () => {
	return instance.get(`/referral/get-referral-link`);
};

export const useGetReferral = () =>
	useQuery(["ref-code"], () => getReferral(), {
		refetchOnWindowFocus: false,
	});

// User information update

const updateUserInfo = ({
	userId,
	data,
}: {
	userId: IUserId;
	data: IUpdateUser | any;
}) => {
	return instance.put(`/update-user/${userId}`, {
		...data,
		isActive: true,
		userType: "User",
	});
};

export const useUpdateUserInfo = () => {
	const query = useQueryClient();
	return useMutation([], updateUserInfo, {
		onSuccess: () => {
			query.invalidateQueries(["user"]);
			query.invalidateQueries(["validate"]);
		},
	});
};

const updatePassword = (data: {
	phone?: string;
	currentPassword?: string;
	password?: string;
	token: string | null;
}) => {
	return instance.put(`/update-password`, {
		...data,
		userType: "User",
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

const bookmarkRestaurant = ({
	vendorId,
	value,
}: {
	vendorId: IVendorId;
	value: boolean;
}) => {
	return value
		? instance.post(`/user/save-restaurant/${vendorId}`)
		: instance.delete(`/user/save-restaurant/${vendorId}`);
};

export const useBookmarkRestaurant = () => {
	const queryClient = useQueryClient();
	return useMutation(bookmarkRestaurant, {
		onSuccess: () => {
			queryClient.invalidateQueries(["user"]);
			queryClient.invalidateQueries(["user-2"]);
		},
	});
};

const getReservationList = ({
	userId,
	status,
}: {
	userId: IUserId;
	status?: string;
}) => {
	return instance.get(`/reservations`, {
		params: {
			userId,
			status,
			pageSize: 1000,
		},
	});
};
export const useGetReservationList = (userId: IUserId, status?: string) => {
	return useQuery(
		["Reservation-List", userId, status],
		() => getReservationList({ userId, status }),
		{
			enabled: !!userId,
			select: (data) => {
				return data.data;
			},
		}
	);
};
