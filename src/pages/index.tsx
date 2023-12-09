import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Home({ data }: { data: any }) {
	const { t } = useTranslation("common");

	return (
		<>
			<Head>
				<title>{t("META.TITLE").toString()}</title>
				<meta
					name="description"
					content={t("META.DESCRIPTION").toString()}
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<main></main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			data: {},
			...(await serverSideTranslations(context.locale ?? "en", [
				"common",
				"home",
			])),
			// Will be passed to the page component as props
		},
	};
};
