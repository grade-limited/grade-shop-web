import Iconify from "@/components/iconify";
import { findUnitPrice } from "@/pages/product/[id]";
import { useGetCarts } from "@/queries/cart";
import { useAuth } from "@/service/auth";
import { DialogTitle, Drawer, IconButton } from "@mui/material";
import React from "react";
import OrderCart from "./OrderCart";
import { useToggle } from "@tam11a/react-use-hooks";
import { Icon } from "@iconify/react";
import { Divider } from "antd";

const Cart: React.FC = () => {
	const { data, isLoading } = useGetCarts();
	const { isAuthenticated, isValidationLoading } = useAuth();
	const { state, toggleState } = useToggle(false);

	if (isLoading || !isAuthenticated || isValidationLoading) return null;

	return (
		<div>
			<div
				className="absolute z-[1500] top-1/3 right-0 -translate-y-1/2 bg-slate-800 p-3 flex flex-row items-center justify-center rounded-l shadow-md shadow-slate-900 gap-2 border-r-0 cursor-pointer"
				onClick={toggleState}
			>
				<Iconify
					icon={"solar:cart-3-bold"}
					className="text-4xl text-primary-600"
				/>
				<div className="text-white">
					<h2 className="text-center text-slate-400 text-sm">
						Cart {!!data?.length && <>({data?.length})</>}
					</h2>
					<p className="font-semibold">
						{data
							?.map?.((item: any) =>
								findUnitPrice("bb2e", item.quanitty, item.product.price)
							)
							?.reduce?.((x: number, y: number) => x + y) || 0}
						৳
					</p>
				</div>
			</div>
			<Drawer
				open={state}
				onClose={toggleState}
				anchor="right"
				className="z-[1501]"
				PaperProps={{
					className: "w-[95vw] max-w-sm",
				}}
			>
				<DialogTitle className="flex flex-row items-center justify-between">
					<h3>Cart {!!data?.length && <>({data?.length})</>}</h3>
					<IconButton>
						<Icon icon={"mdi:close"} />
					</IconButton>
				</DialogTitle>
				<Divider className="my-0" />
				<OrderCart />
				<Divider className="my-0" />
				<div className="flex flex-row items-center justify-between p-4">
					<h3>Total</h3>
					<p className="font-semibold">
						{data
							?.map?.((item: any) =>
								findUnitPrice("bb2e", item.quanitty, item.product.price)
							)
							?.reduce?.((x: number, y: number) => x + y) || 0}
						৳
					</p>
				</div>
			</Drawer>
		</div>
	);
};

export default Cart;
