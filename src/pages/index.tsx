import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { getCampaigns, useGetCampaigns } from "@/queries/campaign";
import Banner from "@/components/pages/home/Banner";
import {
	getCategory,
	getShopCatProd,
	useGetCategory,
	useGetShopCatProd,
} from "@/queries/category";
import Category from "@/components/pages/home/Category";
import CatProd from "@/components/pages/home/CatProd";
import { getBrands, useGetBrands } from "@/queries/brand";

export default function Home({ data }: { data: any }) {
	const { t } = useTranslation("common");

	const { data: CampaignData } = useGetCampaigns({
		initialData: data?.campaigns,
	});

	const { data: CategoryData } = useGetCategory({
		initialData: data?.categories,
		params: {
			only_parent: true,
			limit: 1000,
		},
	});

	const { data: BrandData } = useGetBrands({
		initialData: data?.brands,
		params: {
			limit: 100,
		},
	});

	const { data: catprod } = useGetShopCatProd({
		initialData: data?.catprod,
	});

	console.log(BrandData);

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
				<div className="p-4">
					<Category categories={CategoryData?.data || []} />
				</div>
				{catprod?.map?.((item: any) => {
					return (
						<CatProd
							key={item.id}
							data={item}
						/>
					);
				})}
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const campaigns = await getCampaigns();
		const categories = await getCategory({
			only_parent: true,
			limit: 1000,
		});
		const brands = await getBrands({
			limit: 100,
		});

		const catprod = await getShopCatProd();

		return {
			props: {
				data: {
					campaigns: {
						data: campaigns?.data || {},
					},
					categories: {
						data: categories?.data || {},
					},
					catprod: {
						data: catprod?.data || {},
					},
					brands: {
						data: brands?.data || {},
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
				...(await serverSideTranslations(context.locale ?? "en", [
					"common",
					"home",
				])),
			},
		};
	}
};
