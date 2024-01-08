import Iconify from "@/components/iconify";
import useCart from "@/hooks/useCart";
import {
	AccountEntry,
	findUnitPrice,
	getLowestQuantities,
} from "@/pages/product/[id]";
import { previewImage } from "@/service";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { Badge } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card: React.FC<{ product: any }> = ({ product }) => {
	const b2b_price = findUnitPrice("b2b", 1, product?.price);
	const bb2e_price = findUnitPrice("bb2e", 1, product?.price);

	var price = 0;

	if (b2b_price == 0 && bb2e_price == 0) price = 0;
	else if (b2b_price == 0 && bb2e_price != 0) price = bb2e_price;
	else if (b2b_price != 0 && bb2e_price == 0) price = b2b_price;
	else if (b2b_price != 0 && bb2e_price != 0)
		price = b2b_price < bb2e_price ? b2b_price : bb2e_price;

	var off_price = 0;
	if (product?.market_price && price != 0)
		off_price = Math.round(
			((product?.market_price - price) / product?.market_price) * 100
		);

	const minqt = getLowestQuantities(
		product?.minimum_order_quantity as AccountEntry[]
	);

	const {
		findProduct,
		onUpdate,
		isCartUpdating,
		onAdd,
		isAddingToCart,
		onDelete,
		isDeleting,
	} = useCart();

	const cartData = findProduct(product.id);

	React.useEffect(() => {
		if (!cartData) return;
		// setQt(cartData?.quantity || 1);
		// setCqt(cartData?.quantity || 1);
	}, [cartData]);

	return (
		<div className="flex flex-col border h-full border-slate-300 hover:border-primary-400 rounded-xl p-2 relative">
			<Badge.Ribbon
				text={
					<>
						<Iconify
							icon={"iconamoon:discount-fill"}
							className="text-2xl text-white mr-1 inline-flex"
						/>
						{off_price}% Off!
					</>
				}
				style={{
					display: off_price > 0 ? "unset" : "none",
					paddingTop: "6px",
					height: "35px",
				}}
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
			</Badge.Ribbon>
			<div className="flex-1 flex flex-col mt-2 min-h-14 p-1 relative">
				<Link
					href={`/product/${product.id}`}
					className="flex-1"
				>
					<Typography className="text-center font-bold">
						{product.name}
					</Typography>
				</Link>
				<div className="text-center">
					{!!product?.price?.length && (
						<span className="text-sm font-bold text-slate-700">{price}৳</span>
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
			{!cartData ? (
				<Button
					variant="contained"
					color="primary"
					size="large"
					fullWidth
					className="mt-2 rounded-md bg-slate-700 hover:bg-slate-600"
					startIcon={<Iconify icon={"fa-solid:cart-plus"} />}
					onClick={() => onAdd(product?.id, minqt?.bb2e || 1)}
					disabled={isAddingToCart}
				>
					Add to Cart
				</Button>
			) : (
				<div className="bg-slate-600 p-1 w-fit mx-auto rounded-full flex flex-row items-center justify-between gap-3">
					<IconButton
						className="bg-slate-300 p-1"
						onClick={() =>
							cartData?.quantity > (minqt?.bb2e || 1)
								? onUpdate(cartData?.id, { quantity: cartData?.quantity - 1 })
								: onDelete(cartData?.id)
						}
						disabled={isCartUpdating || isDeleting}
					>
						<Iconify
							icon={
								cartData?.quantity > (minqt?.bb2e || 1)
									? "mdi:minus"
									: "fluent:delete-12-filled"
							}
						/>
					</IconButton>
					<span className="text-white text-xl">{cartData?.quantity}</span>
					<IconButton
						className="bg-slate-300 p-1"
						onClick={() =>
							onUpdate(cartData?.id, { quantity: cartData?.quantity + 1 })
						}
						disabled={isCartUpdating || isDeleting}
					>
						<Iconify icon={"mdi:plus"} />
					</IconButton>
				</div>
			)}
		</div>
	);
};

export default Card;
