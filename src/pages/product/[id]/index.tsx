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
import { Breadcrumb, Tabs, Tag } from "antd";
import { Avatar, Button } from "@mui/material";
import Iconify from "@/components/iconify";

type AccountEntry = { account_type: string; quantity: string };

function getLowestQuantities(entries: AccountEntry[] = []): {
	[accountType: string]: number;
} {
	const lowestQuantities: { [accountType: string]: number } = {};

	entries?.forEach((entry) => {
		const { account_type, quantity } = entry;
		const currentQuantity = parseInt(quantity, 10);

		if (
			!(account_type in lowestQuantities) ||
			currentQuantity < lowestQuantities[account_type]
		) {
			lowestQuantities[account_type] = currentQuantity;
		}
	});

	return lowestQuantities;
}

function findUnitPrice(
	accountType: string,
	quantity: number,
	pricingChart: any
): number | null {
	const priceInfo = pricingChart
		.filter(
			(item: any) =>
				item.account_type === accountType && item.min_quantity <= quantity
		)
		.sort((a: any, b: any) => {
			const minQuantityA = parseInt(a.min_quantity, 10);
			const minQuantityB = parseInt(b.min_quantity, 10);
			return minQuantityA - minQuantityB;
		});

	if (!priceInfo?.length) {
		console.error(
			`No pricing information found for account type: ${accountType}`
		);
		return parseInt(
			pricingChart
				.filter((item: any) => item.account_type === accountType)
				.sort((a: any, b: any) => {
					const minQuantityA = parseInt(a.min_quantity, 10);
					const minQuantityB = parseInt(b.min_quantity, 10);
					return minQuantityA - minQuantityB;
				})?.[0]?.per_unit || "0",
			10
		);
	}

	return parseInt(priceInfo?.[priceInfo?.length - 1]?.per_unit || "0", 10);
}

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
											{productData?.brand?.name} (Brand)
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

						<br />

						<Tabs
							defaultActiveKey="bb2e"
							items={[
								{
									key: "bb2e",
									label: "Personal Order",
									children: (
										<>
											{/* Add to Cart Button */}

											<p className="mt-2 text-base">
												<span className="font-bold">Price:</span>
												<span className="ml-2">
													{findUnitPrice("bb2e", 1, productData?.price)}
												</span>
											</p>
											<p className="mt-2 text-2xl text-primary">
												<span className="font-bold">Grade Price:</span>
												<span className="ml-2">
													{findUnitPrice("bb2e", 1, productData?.price)}
												</span>
											</p>
											{productData?.minimum_order_quantity &&
											getLowestQuantities(
												productData?.minimum_order_quantity as AccountEntry[]
											)?.["bb2e"] ? (
												<p className="mt-2 text-base">
													<span className="font-bold">
														Minimum Order Quantity:
													</span>
													<span className="ml-2">
														{
															getLowestQuantities(
																productData?.minimum_order_quantity as AccountEntry[]
															)?.["bb2e"]
														}
													</span>
												</p>
											) : (
												<></>
											)}
											<Button
												variant="contained"
												color="primary"
												size="large"
												className="mt-5 rounded-md bg-slate-700 hover:bg-slate-600"
												startIcon={<Iconify icon={"fa-solid:cart-plus"} />}
											>
												Add to Cart
											</Button>
										</>
									),
								},
								{
									key: "b2b",
									label: "Company Order",
									children: (
										<>
											{/* Add to Cart Button */}
											<p className="mt-2 text-base">
												<span className="font-bold">Price:</span>
												<span className="ml-2">
													{findUnitPrice("b2b", 1, productData?.price)}
												</span>
											</p>
											<p className="mt-2 text-base">
												<span className="font-bold">Grade Price:</span>
												<span className="ml-2">
													{findUnitPrice("b2b", 1, productData?.price)}
												</span>
											</p>
											{productData?.minimum_order_quantity &&
											getLowestQuantities(
												productData?.minimum_order_quantity as AccountEntry[]
											)?.["b2b"] ? (
												<p className="mt-2 text-base">
													<span className="font-bold">
														Minimum Order Quantity:
													</span>
													<span className="ml-2">
														{
															getLowestQuantities(
																productData?.minimum_order_quantity as AccountEntry[]
															)?.["b2b"]
														}
													</span>
												</p>
											) : (
												<></>
											)}
											<Button
												variant="contained"
												color="primary"
												size="large"
												className="mt-5 rounded-md bg-slate-700 hover:bg-slate-600"
												startIcon={<Iconify icon={"fa-solid:cart-plus"} />}
											>
												Add to Cart
											</Button>
										</>
									),
								},
							]}
						/>
						<div
							className="text-justify max-w-md mt-6"
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
