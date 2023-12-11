import Iconify from "@/components/iconify";
import { previewImage } from "@/service";
import { Avatar, Button, Typography } from "@mui/material";
import { Empty } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { findUnitPrice } from "../../../../pages/product/[id]/index";

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
				<div
					key={index}
					className="border border-slate-300 rounded-xl p-2 relative h-fit"
				>
					<Link href={`/product/${product.id}`}>
						{product?.thumbnail_url ? (
							<Image
								src={previewImage(product?.thumbnail_url)}
								height={500}
								width={280}
								alt={product.name}
								className="relative h-60 w-full object-cover rounded-md border border-slate-200 shadow-md shadow-slate-300"
							/>
						) : (
							<Avatar
								className="relative text-slate-600 h-60 w-full bg-slate-200 object-cover rounded-md border border-slate-200 shadow-md shadow-slate-300"
								sx={{
									bgcolor: "transparent",
									fontSize: "6rem",
								}}
							>
								<Iconify icon={"solar:wallpaper-broken"} />
							</Avatar>
						)}
					</Link>
					<div className="flex flex-col mt-2 h-14 p-1 relative">
						<Link href={`/product/${product.id}`}>
							<Typography
								noWrap
								className="font-bold"
							>
								{product.name}
							</Typography>
						</Link>
						<div>
							<span className="text-sm text-slate-400">
								{product?.brand?.name}
							</span>
							{!!product?.price?.length && (
								<span className="text-sm font-bold text-slate-700">
									{" "}
									&bull; {findUnitPrice("b2b", 1, product?.price)}৳
								</span>
							)}
							{!!product?.market_price && (
								<>
									{" "}
									<del className="text-sm text-slate-400">
										{product?.market_price}৳
									</del>
								</>
							)}
						</div>
					</div>
					<Button
						variant="contained"
						color="primary"
						size="large"
						fullWidth
						className="mt-2 rounded-md bg-slate-700 hover:bg-slate-600"
						startIcon={<Iconify icon={"fa-solid:cart-plus"} />}
					>
						Add to Cart
					</Button>
				</div>
			))}
		</div>
	);
};

export default Products;
