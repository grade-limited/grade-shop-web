import { useEffect, useState } from "react";
import { authService } from "./auth.service";
import { useGetValidation } from "@/queries/auth";
import { message } from "@/components/antd/message";

export const useAuth = () => {
	const [token, setToken] = useState<string | null>(authService.getToken());
	const [user, setUser] = useState<IUser | null>(null);

	useEffect(() => {
		const unsubscribe = authService.listen((v) => {
			setToken(v);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const {
		data: validationData,
		isLoading: isValidationLoading,
		isError: isValidationError,
		error,
	} = useGetValidation(token);

	useEffect(() => {
		let status = error?.request?.status;
		if (!isValidationError || status !== 401) return;

		message.open({
			type: "loading",
			content: "Signing out..",
			duration: 0,
		});

		setTimeout(() => {
			authService.removeToken();
			message.success("Logged out! Please sign in again");
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isValidationError]);

	useEffect(() => {
		if (!validationData) return;
		setUser(validationData?.data);
	}, [validationData]);

	return {
		token,
		user,
		isValidationLoading,
		isAuthenticated: !!token,
	};
};

export type IUser = {
	id: number;
	first_name: string;
	last_name: string;
	email?: string;
	phone?: string;
	username: string;
	gender: "Male" | "Female" | "Non-Binary";
	display_picture?: string;
	organizations: any[];
	dob?: string;
	address?: string;
	referral_code: string;
	referred_by_id?: number;
	max_session: number;
	is_active: boolean;
	phone_verified_at?: string;
	email_verified_at?: string;
	registered_from: string;
	created_at?: string;
	updated_at?: string;
	deleted_at?: string;
};
