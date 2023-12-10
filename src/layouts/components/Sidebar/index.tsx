import { useGetSearchCategory } from "@/queries/category";
import { Menu, MenuProps, Skeleton } from "antd";
import React from "react";
import Image from "next/image";
import { previewImage } from "@/service";

type MenuItem = Required<MenuProps>["items"][number];
type CategoryItem = {
	id: number;
	name: string;
	icon_url?: string;
	children: CategoryItem[];
};

function getItem(
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const generateItem = ({
	id,
	name,
	icon_url,
	children,
}: CategoryItem): MenuItem =>
	getItem(
		name,
		id,
		icon_url ? (
			<Image
				src={previewImage(icon_url)}
				height={80}
				width={80}
				className="h-6 w-6"
				alt={name}
			/>
		) : null,
		!!children?.length
			? Array.from(children, (item) => generateItem(item))
			: undefined
	);

const Sidebar: React.FC = () => {
	const { data, isLoading } = useGetSearchCategory();
	return (
		<aside className="w-72 h-[calc(100vh-72px)] md:h-[calc(100vh-96px)] bg-white relative overflow-y-auto">
			{isLoading ? (
				<div className="p-3 [&>*]:my-3">
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			) : (
				<Menu
					defaultSelectedKeys={["1"]}
					defaultOpenKeys={["sub1"]}
					mode={"inline"}
					inlineCollapsed={false}
					theme={"light"}
					items={Array.from(data ?? [], (item: CategoryItem) =>
						generateItem(item)
					)}
					className="[&>.ant-menu-submenu>.ant-menu-submenu-title]:pl-2 text-xs font-bold"
				/>
			)}
		</aside>
	);
};

export default Sidebar;
