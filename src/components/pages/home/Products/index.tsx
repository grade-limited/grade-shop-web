import React from "react";
import { Empty } from "antd";
import Card from "./Card";

const Products: React.FC<{ products: any[] }> = ({ products }) => {
	return products?.length === 0 ? (
		<div>
			<Empty
				description="No Products Found"
				image={Empty.PRESENTED_IMAGE_SIMPLE}
			/>
		</div>
	) : (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 relative">
			{products?.map((product, index) => (
				<React.Fragment key={index}>
					<Card product={product} />
				</React.Fragment>
			))}
		</div>
	);
};

export default Products;
