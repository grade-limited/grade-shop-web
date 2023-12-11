import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import xss from "xss";
import { getProductById, useGetProductById } from "@/queries/product";
import Image from "next/image";
import { previewImage } from "@/service";

const Category: React.FC<{ data: any }> = ({ data }) => {
	const router = useRouter();
	const { id } = router.query;

	const { t } = useTranslation("product");

	const { data: productData } = useGetProductById({
		id: parseInt(id as string),
		initialData: data?.productById,
		params: {},
	});

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
			<main className="px-5 py-3 flex flex-row gap-4">
				{productData?.thumbnail_url && (
					<Image
						src={previewImage(productData?.thumbnail_url)}
						alt={productData?.name}
						width={540}
						height={820}
						priority
						style={{
							position: "relative",
							objectFit: "cover",
							objectPosition: "center",
							borderRadius: "6px",
						}}
					/>
				)}
				<div className="flex-1">
					<h1 className="text-2xl font-bold mt-4 mb-2">{productData?.name}</h1>
					<div
						className="text-justify"
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

export default Category;
