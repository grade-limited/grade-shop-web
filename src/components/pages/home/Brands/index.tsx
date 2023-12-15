import React from "react";
import Image from "next/image";
import { previewImage } from "@/service";
import Link from "next/link";

const Brands: React.FC<{
	brands: any[];
}> = ({ brands }) => {
	return (
		<>
			<div className="m-4 py-3 px-3 rounded-2xl bg-white">
				<h1 className="text-2xl font-bold my-4 px-6">Top Brands</h1>

				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-2 relative ">
					{brands?.map?.((brand: any, index) =>
						brand?.thumbnail_url ? (
							<Link
								key={index}
								href={`/brand/${brand?.id}`}
								className="rounded-xl relative h-fit bg-white"
							>
								<Image
									src={previewImage(brand?.thumbnail_url)}
									height={500}
									width={280}
									alt={brand.name}
									className="relative aspect-square h-auto w-full object-cover rounded-md border border-slate-200 shadow-md shadow-slate-200"
								/>
							</Link>
						) : (
							<></>
						)
					)}
				</div>
			</div>
		</>
	);
};

export default Brands;
