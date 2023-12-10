import React from "react";
import { withAuth } from "@/hoc/auth";
import UserNav from "@/components/pages/user/nav";
import useUser from "@/hooks/useUser";
import { List } from "@mui/material";
// import SavedCard from "@/components/pages/user/SavedCard";
import { InlineIcon } from "@iconify/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SavedRestaurants = () => {
	const user = useUser();
	const [saved, setSaved] = React.useState([]);

	// React.useEffect(() => {
	// 	setSaved(user?.savedRestaurent || []);
	// }, [user?.savedRestaurent]);

	return (
		<UserNav>
			<h1 className="font-medium text-2xl mt-5 mb-3 flex flex-row items-center gap-2">
				<InlineIcon
					icon={"majesticons:heart"}
					className="text-3xl"
				/>{" "}
				Saved Products
			</h1>
			<List>
				{/* {saved?.map?.((restaurant: any) => (
					<SavedCard
						restaurant={restaurant}
						key={restaurant.id}
					/>
				))} */}
			</List>
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

export default withAuth(SavedRestaurants);
