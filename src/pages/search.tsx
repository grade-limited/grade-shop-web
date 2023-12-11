import Products from "@/components/pages/home/Products";
import { getProducts, useGetProducts } from "@/queries/product";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export default function Search({ data }: { data: any }) {
	const router = useRouter();
	const { q } = router.query;

	const { data: products } = useGetProducts({
		initialData: data?.products,
		params: {
			search: q as string,
			limit: 100,
			sort: "id",
		},
	});

	return (
		<>
			<main className="p-4">
				{!!q && (
					<div className="mb-4">
						<h1 className="text-2xl font-bold">Search: {q}</h1>
						<p className="text-semibold text-slate-600">
							{products?.total} {products?.total > 1 ? "products" : "product"}{" "}
							found
						</p>
					</div>
				)}
				<Products products={products?.data || []} />
			</main>
		</>
	);
}
export const getServerSideProps: GetServerSideProps = async (context) => {
	const { q } = context.query;
	const products = await getProducts({
		search: q as string,
		limit: 100,
		sort: "id",
	});
	try {
		return {
			props: {
				data: {
					products: { data: products?.data || { data: {} } },
				},
				...(await serverSideTranslations(context.locale ?? "en", [
					"common",
					"search",
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
					"search",
				])),
			},
		};
	}
};
