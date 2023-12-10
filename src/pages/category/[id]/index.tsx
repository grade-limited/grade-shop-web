import { getCategoryById, useGetCategoryById } from "@/queries/category";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import xss from "xss";

const Category: React.FC<{ data: any }> = ({ data }) => {
	const router = useRouter();
	const { id } = router.query;

	const { t } = useTranslation("restaurant");

	const { data: categoryData } = useGetCategoryById({
		id: parseInt(id as string),
		initialData: data?.categoryById,
		params: {},
	});

	console.log(categoryData);

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
					content={`${xss(categoryData.post, {
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
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const { id } = context.query;
		const categoryById = await getCategoryById(parseInt(id as string));

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
