import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import xss from "xss";
import { getProductById, useGetProductById } from "@/queries/product";
import Image from "next/image";
import { previewImage } from "@/service";
import React from "react";
import { Breadcrumb } from "antd";

const Product: React.FC<{ data: any }> = ({ data }) => {
	const router = useRouter();
	const { id } = router.query;

	const { t } = useTranslation("product");

	const [thumbnail, setThumbnail] = React.useState<string | null>(null);

	const { data: productData } = useGetProductById({
		id: parseInt(id as string),
		initialData: data?.productById,
		params: {},
	});

	React.useLayoutEffect(() => {
		if (productData?.thumbnail_url) {
			setThumbnail(previewImage(productData?.thumbnail_url));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log(productData);

	return (
		<>
			<Head>
				<title>
					{productData?.name} -{" "}
					{t("META.TITLE", {
						ns: "common",
					}).toString()}
				</title>
				<meta
					name="description"
					content={`${xss(productData?.description, {
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
				<div className="flex flex-col lg:flex-row gap-4">
					{thumbnail && (
						<Image
							src={thumbnail}
							alt={productData?.name}
							width={540}
							height={820}
							priority
							style={{
								position: "relative",
								objectFit: "cover",
								objectPosition: "center",
								borderRadius: "6px",
								maxWidth: "500px",
							}}
						/>
					)}
					<div className="flex-1">
						{!!productData?.category && (
							<h2>
								<Breadcrumb>
									{!!productData?.category?.parent_id && (
										<Breadcrumb.Item
											href={`/category/${productData?.category?.parent?.id}`}
										>
											{productData?.category?.parent?.name}
										</Breadcrumb.Item>
									)}
									{!!productData?.category && (
										<Breadcrumb.Item
											href={`/category/${productData?.category?.id}`}
										>
											{productData?.category?.name}
										</Breadcrumb.Item>
									)}
								</Breadcrumb>
							</h2>
						)}
						<h1 className="text-2xl font-bold my-2">{productData?.name}</h1>
						<div
							className="text-justify max-w-md"
							dangerouslySetInnerHTML={{
								__html: xss(productData?.description, {
									// whiteList: {}, // empty, means filter out all tags
									// stripIgnoreTag: true, // filter out all HTML not in the whilelist
									stripIgnoreTagBody: ["script"], // the script tag is a special case, we need
									// to filter out its content
								}),
							}}
						/>
					</div>
				</div>
			</main>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const { id } = context.query;
		const productById = await getProductById(parseInt(id as string));

		if (productById?.data?.data?.deleted_at) {
			return {
				notFound: true,
				props: {
					...(await serverSideTranslations(context.locale ?? "en", [
						"common",
						"product",
					])),
					// Will be passed to the page component as props
				},
			};
		}

		return {
			props: {
				data: {
					productById: { data: productById?.data || { data: {} } },
				},
				...(await serverSideTranslations(context.locale ?? "en", [
					"common",
					"product",
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
					"product",
				])),
				// Will be passed to the page component as props
			},
		};
	}
};

export default Product;
