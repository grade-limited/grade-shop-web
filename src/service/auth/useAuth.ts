import { useEffect, useState } from "react";
import { authService } from "./auth.service";
import { useGetValidation } from "@/queries/auth";
import { message } from "@/components/antd/message";

export const useAuth = () => {
	const [token, setToken] = useState<string | null>(authService.getToken());
	const [user, setUser] = useState({
		id: 0,
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		username: "",
		gender: "Male",
		display_picture: "",
		dob: "",
		address: "",
		referral_code: "",
		referred_by_id: 0,
		max_session: 10,
		is_active: true,
		phone_verified_at: null,
		email_verified_at: null,
		registered_from: "Website",
		created_at: null,
		updated_at: null,
		deleted_at: null,
	});

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
