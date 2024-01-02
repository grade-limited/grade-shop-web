import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "@mui/material";

// import PushNotificationLayout from "@/components/PushNoti";

import useUser from "@/hooks/useUser";
import { useRegisterDevice } from "./../queries/auth/index";
import { onMessageListener, requestToken } from "@/config/fcm";
import { IUserId } from "@/types";
import { notification } from "antd";
import Sidebar from "./components/Sidebar";
import { Cart } from "./components";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { mutateAsync: registerNotification } = useRegisterDevice();
	const user = useUser();

	const registerDeviceForNotification = async (userId: IUserId) => {
		try {
			if (!!userId)
				registerNotification({
					userId,
					deviceId: await requestToken(),
				});
		} catch {
			return;
		}
	};

	// useEffect(() => {
	// 	try {
	// 		if (typeof window !== undefined && !!user.userId) {
	// 			registerDeviceForNotification(user.userId);
	// 			onMessageListener()
	// 				.then((payload: any) => {
	// 					if (payload?.notification?.body || payload?.notification?.title)
	// 						notification.info({
	// 							message: payload?.notification?.title,
	// 							description: payload?.notification?.body,
	// 							duration: 4.5,
	// 							placement: "bottomLeft",
	// 						});
	// 				})
	// 				.catch((err) => console.log("failed: ", err));
	// 		}
	// 	} catch {
	// 		return;
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [user.userID]);

	return (
		<div className="w-full bg-slate-100 overflow-hidden">
			<Header />
			<div className="h-[72px] md:h-24" />
			<section className="flex flex-row items-start relative justify-between">
				<div className="hidden md:inline">
					<Sidebar />
				</div>
				<section className="flex-1 relative h-[calc(100vh-72px)] md:h-[calc(100vh-96px)] overflow-y-auto">
					<Container className="min-h-[60vh] overflow-x-hidden relative pt-2 pb-6 overflow-y-auto max-w-[1620px] px-0">
						{children}
					</Container>
					<Footer />
				</section>
			</section>
			<Cart />
		</div>
	);
};

export default Layout;
