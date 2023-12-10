import { previewImage } from "@/service";
import React from "react";

const Category: React.FC<{ categories?: any[] }> = ({ categories }) => {
	console.log(categories);
	return (
		<div className="grid grid-cols-4">
			{categories?.map((category) => {
				return <div key={category.id}>{category.name}</div>;
			})}
		</div>
	);
};

export default Category;
