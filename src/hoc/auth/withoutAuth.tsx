import { useAuth } from "@/service/auth";
import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";

export const withoutAuth = <T extends object>(
	WrappedComponent: ComponentType<T>
) => {
	// eslint-disable-next-line react/display-name
	return (props: T) => {
		const { isAuthenticated } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (isAuthenticated) {
				router.replace(router.query?.to?.toString?.() || "/user");
			}
		}, [isAuthenticated, router]);

		return <WrappedComponent {...props} />;
	};
};
