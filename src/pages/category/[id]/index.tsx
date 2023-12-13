import {
	getCategory,
	getCategoryById,
	useGetCategory,
	useGetCategoryById,
} from "@/queries/category";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import xss from "xss";
import Image from "next/image";
import { previewImage } from "@/service";
import Subcategory from "@/components/pages/home/Category";
import { Divider } from "antd";
import { getProducts, useGetProducts } from "@/queries/product";
import Products from "@/components/pages/home/Products";

const Category: React.FC<{ data: any }> = ({ data }) => {
	const router = useRouter();
	const { id } = router.query;

	const { t } = useTranslation("restaurant");

	const { data: categoryData } = useGetCategoryById({
		id: parseInt(id as string),
		initialData: data?.categoryById,
		params: {},
	});

	const { data: subcategories } = useGetCategory({
		initialData: data?.subcategories,
		params: {
			parent_id: parseInt(id as string),
			limit: 1000,
		},
	});

	const { data: products } = useGetProducts({
		initialData: data?.products,
		params: {
			category_id: parseInt(id as string),
			limit: 50,
		},
	});

	return (
		<>
			<Head>
				<title>
					{categoryData?.name} -{" "}
					{t("META.TITLE", {
						ns: "common",
					}).toString()}
				</title>
				<meta
					name="description"
					content={`${xss(categoryData?.description, {
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
				{categoryData?.cover_url && (
					<Image
						src={previewImage(categoryData?.cover_url)}
						alt={categoryData?.name}
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
				<h1 className="text-2xl font-bold mt-4 mb-2">{categoryData?.name}</h1>
				<div
					className="text-justify"
					dangerouslySetInnerHTML={{
						__html: xss(categoryData?.description, {
							// whiteList: {}, // empty, means filter out all tags
							// stripIgnoreTag: true, // filter out all HTML not in the whilelist
							stripIgnoreTagBody: ["script"], // the script tag is a special case, we need
							// to filter out its content
						}),
					}}
				/>
				{!!subcategories?.data?.length && (
					<>
						{!!products?.data?.length && (
							<>
								<Divider className="my-2 mt-5" />
								<h3 className="text-lg font-semibold px-2">
									{subcategories?.total} Subcategories Found
								</h3>
								<Divider className="my-2" />
							</>
						)}
						<div className="py-4">
							<Subcategory categories={subcategories?.data || []} />
						</div>
					</>
				)}
				{!!products?.data?.length && (
					<>
						{!!subcategories?.data?.length && (
							<>
								<Divider className="my-2" />
								<h3 className="text-lg font-semibold px-2">
									{products?.total} Products Found
								</h3>
								<Divider className="my-2" />
							</>
						)}
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
		const categoryById = await getCategoryById(parseInt(id as string));
		const subcategories = await getCategory({
			parent_id: id,
			limit: 1000,
		});

		const products = await getProducts({
			category_id: id,
			limit: 50,
		});

		if (categoryById?.data?.data?.deleted_at) {
			return {
				notFound: true,
				props: {
					...(await serverSideTranslations(context.locale ?? "en", [
						"common",
						"category",
					])),
					// Will be passed to the page component as props
				},
			};
		}

		return {
			props: {
				data: {
					categoryById: { data: categoryById?.data || { data: {} } },
					subcategories: { data: subcategories?.data || { data: {} } },
					products: { data: products?.data || { data: {} } },
				},
				...(await serverSideTranslations(context.locale ?? "en", [
					"common",
					"category",
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
					"category",
				])),
				// Will be passed to the page component as props
			},
		};
	}
};

export default Category;
