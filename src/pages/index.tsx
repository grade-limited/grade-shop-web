import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getCampaigns, useGetCampaigns } from "@/queries/campaign";
import Banner from "@/components/pages/home/Banner";
import { getCategory, useGetCategory } from "@/queries/category";
import Category from "@/components/pages/home/Category";

export default function Home({ data }: { data: any }) {
	const { t } = useTranslation("common");

	const { data: CampaignData } = useGetCampaigns({
		initialData: data?.campaigns,
	});

	const { data: CategoryData } = useGetCategory({
		initialData: data?.categories,
		params: {
			only_parent: true,
		},
	});

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
			<main>
				<Banner banners={CampaignData?.data || []} />
				<Category categories={CategoryData?.data || []} />
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const campaigns = await getCampaigns();
		const categories = await getCategory({
			only_parent: true,
		});
		return {
			props: {
				data: {
					campaigns: {
						data: campaigns?.data || {},
					},
					categories: {
						data: categories?.data || {},
					},
				},
				...(await serverSideTranslations(context.locale ?? "en", [
					"common",
					"home",
				])),
				// Will be passed to the page component as props
			},
		};
	} catch (error) {
		return {
			props: {
				notFound: true,
			},
		};
	}
};
