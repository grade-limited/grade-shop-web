import NoOrg from "@/components/pages/user/my-organization/no-org";
import UserNav from "@/components/pages/user/nav";
import { withAuth } from "@/hoc/auth";
import useUser from "@/hooks/useUser";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const MyOrganization: React.FC = () => {
	const user = useUser();

	return (
		<UserNav>
			{!!user?.organizations?.length ? (
				<></>
			) : (
				<>
					<NoOrg />
				</>
			)}
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

export default withAuth(MyOrganization);
