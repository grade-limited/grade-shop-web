import React from "react";
import { Avatar } from "@mui/material";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const NotFound: React.FC = () => {
	return (
		<>
			<Head>
				<title>Page Not Found | Reserveit</title>
				<meta
					name="description"
					content="Reserveit is the first online restaurant reservation platform based in Bangladesh. This is a simple and user-friendly application for selecting restaurants and booking seats for your next dine-out."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<main>
				<Avatar
					variant={"square"}
					src={"/404.svg"}
					className="w-full max-w-xl mx-auto py-10 h-auto"
				/>
			</main>
		</>
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

export default NotFound;
