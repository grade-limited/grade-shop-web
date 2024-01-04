import Iconify from "@/components/iconify";
import { findUnitPrice } from "@/pages/product/[id]";
import { useGetCarts } from "@/queries/cart";
import { previewImage } from "@/service";
import {
	Avatar,
	Collapse,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemSecondaryAction,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import { Skeleton } from "antd";
import React from "react";

const OrderCart: React.FC = () => {
	const { data, isLoading } = useGetCarts();

	return (
		<>
			<List
				dense
				className="flex-1"
			>
				<ListSubheader>Personal</ListSubheader>
				{isLoading ? (
					<Skeleton />
				) : (
					data?.map?.((item: any) => (
						<ListItemButton key={item.id}>
							<ListItemAvatar>
								<Avatar
									variant="rounded"
									className="border-slate-200 border bg-slate-200 text-slate-600"
									src={previewImage(item.product.thumbnail_url)}
								>
									<Iconify icon={"solar:album-broken"} />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={item.product.name}
								secondary={`${findUnitPrice(
									"bb2e",
									1,
									item.product.price
								)}৳ × ${item.quantity} items = ${
									findUnitPrice("bb2e", 1, item.product.price) * item.quantity
								}৳`}
							/>
							<ListItemSecondaryAction>
								<Iconify icon={"solar:pen-broken"} />
							</ListItemSecondaryAction>
						</ListItemButton>
					))
				)}
			</List>
		</>
	);
};

export default OrderCart;
