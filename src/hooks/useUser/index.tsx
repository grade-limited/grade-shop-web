import { useGetUserInfo, useGetUserInfo2 } from "@/queries/auth";
import { useAuth } from "../useAuth";

const useUser = () => {
	const { user } = useAuth();
	const { data } = useGetUserInfo(user.userId);
	const { data: data2 } = useGetUserInfo2(user.userId);
	return {
		...user,
		...data?.data,
		...data2?.data,
	};
};

export default useUser;
