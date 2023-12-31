import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";
import { authService, useAuth } from "@/service/auth";
import { Skeleton } from "antd";

export const withAuth = <T extends object>(
	WrappedComponent: ComponentType<T>
) => {
	// eslint-disable-next-line react/display-name
	return (props: T) => {
		const { isAuthenticated, isValidationLoading } = useAuth();
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

		if (isValidationLoading) {
			return (
				<main className="p-4">
					<Skeleton active />
				</main>
			);
		}

		return <WrappedComponent {...props} />;
	};
};
