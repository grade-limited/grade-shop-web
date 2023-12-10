import { previewImage } from "@/service";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category: React.FC<{ categories?: any[] }> = ({ categories }) => {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4 relative">
			{categories?.map((category, index) => {
				return (
					<Link
						key={index}
						href={`/category/${category.id}`}
						className={`h-40 p-4 rounded-md relative ${
							category.color_code ? category.color_code : "bg-slate-200"
						}`}
					>
						<Image
							src={previewImage(category.thumbnail_url)}
							height={120}
							width={120}
							className="absolute bottom-0 right-0 h-full w-auto"
							alt={category.name}
						/>
						<span className="font-bold relative pl-2">{category.name}</span>
					</Link>
				);
			})}
		</div>
	);
};

export default Category;
