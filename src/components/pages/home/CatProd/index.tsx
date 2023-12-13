import { previewImage } from "@/service";
import Image from "next/image";
import React from "react";
import xss from "xss";
import Products from "../Products";
import Link from "next/link";

const CatProd: React.FC<{
	data: any;
}> = ({ data }) => {
	return data?.products?.length ? (
		<div className="m-4 py-3 px-3 rounded-2xl bg-white">
			{data?.cover_url && (
				<Image
					src={previewImage(data?.cover_url)}
					alt={data?.name}
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
						marginBottom: "16px",
					}}
				/>
			)}
			<div className="flex flex-row items-center justify-between px-6 mb-4">
				<div>
					<h1 className="text-2xl font-bold mt-4 mb-2">{data?.name}</h1>
					<p className="text-sm font-semibold mb-4 text-slate-600">
						Featured Products
					</p>
				</div>
				<Link
					href={`/category/${data?.id}`}
					className="font-bold underline text-slate-700"
				>
					View All
				</Link>
			</div>
			<Products products={data?.products?.slice(0, 12) || []} />
		</div>
	) : (
		<></>
	);
};

export default CatProd;
