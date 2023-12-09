export const getToken = () => {
	if (typeof window !== "undefined") {
		return (
			window?.sessionStorage?.getItem("token") ||
			window?.localStorage?.getItem("token")
		);
	} else {
		return;
	}
};
