import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";
import { authService, useAuth } from "@/service/auth";

export const withAuth = <T extends object>(
	WrappedComponent: ComponentType<T>
) => {
	// eslint-disable-next-line react/display-name
	return (props: T) => {
		const { isAuthenticated } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!isAuthenticated) {
				router.replace({
					pathname: "/sign",
					query: {
						to: router.asPath,
					},
				});
				authService.removeToken();
			}
		}, [isAuthenticated, router]);

		return <WrappedComponent {...props} />;
	};
};
