import Iconify from "@/components/iconify";
import { Menu, MenuProps } from "antd";
import React from "react";

type MenuItem = Required<MenuProps>["items"][number];

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

const items: MenuItem[] = [
	getItem("Navigation One", "1", <Iconify icon={"lucide:user"} />, [
		getItem("Option 7", "7"),
		getItem("Option 8", "8"),
		getItem("Option 9", "9"),
		getItem("Option 10", "10"),
	]),
	getItem("Navigation Two", "2", <Iconify icon={"lucide:user"} />, [
		getItem("Option 7", "7"),
		getItem("Option 8", "8"),
		getItem("Option 9", "9"),
		getItem("Option 10", "10"),
	]),
	getItem("Navigation Two", "sub1", <Iconify icon={"lucide:user"} />, [
		getItem("Option 3", "3"),
		getItem("Option 4", "4"),
		getItem("Submenu", "sub1-2", null, [
			getItem("Option 5", "5"),
			getItem("Option 6", "6"),
		]),
	]),
	getItem("Navigation Three", "sub2", <Iconify icon={"lucide:user"} />, [
		getItem("Option 7", "7"),
		getItem("Option 8", "8"),
		getItem("Option 9", "9"),
		getItem("Option 10", "10", null, [
			getItem("Option 7", "7"),
			getItem("Option 8", "8"),
			getItem("Option 9", "9"),
			getItem("Option 10", "10"),
		]),
	]),
	getItem(
		<a
			href="https://ant.design"
			target="_blank"
			rel="noopener noreferrer"
		>
			Ant Design
		</a>,
		"link",
		<Iconify icon={"lucide:user"} />
	),
];

const Sidebar: React.FC = () => {
	return (
		<aside className="w-72 h-[calc(100vh-72px)] md:h-[calc(100vh-96px)] bg-white relative overflow-y-auto">
			<Menu
				defaultSelectedKeys={["1"]}
				defaultOpenKeys={["sub1"]}
				mode={"inline"}
				inlineCollapsed={false}
				theme={"light"}
				items={items}
			/>
		</aside>
	);
};

export default Sidebar;
