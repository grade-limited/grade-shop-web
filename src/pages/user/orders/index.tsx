import React from "react";
import { withAuth } from "@/hoc/auth";
import UserNav from "@/components/pages/user/nav";
// import StatusList from "@/components/pages/user/reservations/StatusList";
// import { useGetReservationList } from "@/queries/auth";
// import useUser from "@/hooks/useUser";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Reservations = () => {
	// const { userId } = useUser();
	// const { data, isLoading } = useGetReservationList(userId);
	return (
		<UserNav>
			{/* <StatusList
				isLoading={isLoading}
				listitems={
					data?.data?.data?.filter((item: any) => item.status === "Accepted") ||
					[]
				}
				title="Upcoming Reservations"
			/>
			<StatusList
				isLoading={isLoading}
				listitems={
					data?.data?.data?.filter((item: any) => item.status === "Seated") ||
					[]
				}
				title="Seated Reservations"
			/>
			<StatusList
				isLoading={isLoading}
				listitems={
					data?.data?.data?.filter(
						(item: any) => item.status === "Completed"
					) || []
				}
				title="Completed Reservations"
			/>
			<StatusList
				isLoading={isLoading}
				listitems={
					data?.data?.data?.filter((item: any) => item.status === "Canceled") ||
					[]
				}
				title="Cancelled Reservations"
			/> */}
		</UserNav>
	);
};

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale ?? "en", ["common"])),
			// Will be passed to the page component as props
		},
	};
}

export default withAuth(Reservations);
