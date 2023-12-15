import Products from "@/components/pages/home/Products";
import { getBrandById, useGetBrandById } from "@/queries/brand";
import { getProducts, useGetProducts } from "@/queries/product";
import { previewImage } from "@/service";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import xss from "xss";

const Brand: React.FC<{ data: any }> = ({ data }) => {
	const router = useRouter();
	const { id } = router.query;

	const { t } = useTranslation("brand");

	const { data: brandData } = useGetBrandById({
		id: parseInt(id as string),
		initialData: data?.brandById,
		params: {},
	});

	const { data: products } = useGetProducts({
		initialData: data?.products,
		params: {
			brand_id: parseInt(id as string),
			limit: 120,
		},
	});
	return (
		<>
			<Head>
				<title>
					{brandData?.name} -{" "}
					{t("META.TITLE", {
						ns: "common",
					}).toString()}
				</title>
				<meta
					name="description"
					content={`${xss(brandData?.description, {
						whiteList: {}, // empty, means filter out all tags
						stripIgnoreTag: true, // filter out all HTML not in the whilelist
						stripIgnoreTagBody: ["script"], // the script tag is a special case, we need
						// to filter out its content
					})?.slice?.(0, 140)}..`}
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<main className="px-5 py-3">
				{brandData?.cover_url && (
					<Image
						src={previewImage(brandData?.cover_url)}
						alt={brandData?.name}
						width={1640}
						height={720}
						priority
						style={{
							position: "relative",
							width: "100%",
							aspectRatio: "820/360",
							objectFit: "cover",
							maxHeight: "480px",
							objectPosition: "center",
							borderRadius: "6px",
						}}
					/>
				)}
				<div className="flex flex-row items-center justify-start gap-6">
					<Image
						src={previewImage(brandData?.thumbnail_url)}
						alt={`${brandData?.name} Logo`}
						width={300}
						height={300}
						priority
						className="rounded h-24 w-24 object-cover"
					/>
					<div>
						<h1 className="text-2xl font-bold">{brandData?.name}</h1>
						<h3 className="text-sm font-semibold text-slate-600">
							{products?.total} Products Found
						</h3>
					</div>
				</div>
				<div
					className="text-justify"
					dangerouslySetInnerHTML={{
						__html: xss(brandData?.description, {
							// whiteList: {}, // empty, means filter out all tags
							// stripIgnoreTag: true, // filter out all HTML not in the whilelist
							stripIgnoreTagBody: ["script"], // the script tag is a special case, we need
							// to filter out its content
						}),
					}}
				/>
				{!!products?.data?.length && (
					<>
						<div className="py-4">
							<Products products={products?.data || []} />
						</div>
					</>
				)}
			</main>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const { id } = context.query;
		const brandById = await getBrandById(parseInt(id as string));

		const products = await getProducts({
			brand_id: id,
			limit: 120,
		});

		if (brandById?.data?.data?.deleted_at) {
			return {
				notFound: true,
				props: {
					...(await serverSideTranslations(context.locale ?? "en", [
						"common",
						"brand",
					])),
					// Will be passed to the page component as props
				},
			};
		}

		return {
			props: {
				data: {
					brandById: { data: brandById?.data || { data: {} } },
					products: { data: products?.data || { data: {} } },
				},
				...(await serverSideTranslations(context.locale ?? "en", [
					"common",
					"brand",
				])),
				// Will be passed to the page component as props
			},
		};
	} catch {
		return {
			notFound: true,
			props: {
				...(await serverSideTranslations(context.locale ?? "en", [
					"common",
					"brand",
				])),
				// Will be passed to the page component as props
			},
		};
	}
};

export default Brand;
