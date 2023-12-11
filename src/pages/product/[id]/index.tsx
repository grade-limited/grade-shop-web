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
import { Breadcrumb, Tag } from "antd";
import { Avatar } from "@mui/material";

const Product: React.FC<{ data: any }> = ({ data }) => {
	const router = useRouter();
	const { id } = router.query;

	const { t } = useTranslation("product");

	const [thumbnail, setThumbnail] = React.useState<string | null>(null);
	const [images, setImages] = React.useState<string[]>([]);

	const { data: productData, isFetchedAfterMount } = useGetProductById({
		id: parseInt(id as string),
		initialData: data?.productById,
		params: {},
	});

	React.useEffect(() => {
		if (!productData) return;
		if (productData?.attachments?.length) {
			setImages(
				[productData?.attachments]?.map((image: any) => previewImage(image))
			);
		}

		if (productData?.thumbnail_url && isFetchedAfterMount) {
			setImages((prev) => [...prev, previewImage(productData?.thumbnail_url)]);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productData, isFetchedAfterMount]);

	React.useEffect(() => {
		if (images?.length) {
			setThumbnail(images[0]);
		}
	}, [images, isFetchedAfterMount]);

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
					<div>
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
						<div className="flex flex-row items-center gap-2 flex-wrap my-2">
							{images?.map((i: string) => (
								<Avatar
									key={i}
									src={i}
									variant="rounded"
									className={`border-2 ${
										thumbnail === i
											? "border-primary-200"
											: "border-transparent"
									}`}
									sx={{
										width: 60,
										height: 60,
										cursor: "pointer",
									}}
									onClick={() => {
										setThumbnail(i);
									}}
								/>
							))}
						</div>
					</div>
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
									{!!productData?.brand && (
										<Breadcrumb.Item href={`/brand/${productData?.brand?.id}`}>
											{productData?.brand?.name}
										</Breadcrumb.Item>
									)}
								</Breadcrumb>
							</h2>
						)}
						<h1 className="text-2xl font-bold my-2">{productData?.name}</h1>
						<Tag color="#87d068">In Stock</Tag>
						{productData?.sku && (
							<p className="mt-3">
								<span className="font-bold">SKU:</span>
								<span className="ml-2">{productData?.sku}</span>
							</p>
						)}
						{productData?.unit_of_measure && (
							<p className="mt-2">
								<span className="font-bold">Unit of Measure:</span>
								<span className="ml-2">{productData?.unit_of_measure}</span>
							</p>
						)}

						<div
							className="text-justify max-w-md mt-2"
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
