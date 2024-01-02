import Iconify from "@/components/iconify";
import { findUnitPrice } from "@/pages/product/[id]";
import { useGetCarts } from "@/queries/cart";
import { useAuth } from "@/service/auth";
import React from "react";

const Cart: React.FC = () => {
	const { data, isLoading } = useGetCarts();
	const { isAuthenticated, isValidationLoading } = useAuth();

	if (isLoading || !isAuthenticated || isValidationLoading) return null;

	return (
		<div>
			<div className="absolute z-[12121212121] top-1/3 right-0 -translate-y-1/2 bg-slate-800 p-3 flex flex-row items-center justify-center rounded-l shadow-md shadow-slate-900 gap-2 border-r-0 cursor-pointer">
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
		</div>
	);
};

export default Cart;
