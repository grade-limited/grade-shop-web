import { useAuth } from "../useAuth";

const useUser = () => {
	const { user } = useAuth();
	return {
		...user,
		savedProduct: [],
	};
};

export default useUser;
