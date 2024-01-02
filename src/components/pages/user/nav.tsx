import useUser from "@/hooks/useUser";
import { authService, useAuth } from "@/service/auth";
import { InlineIcon } from "@iconify/react";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const UserNav: React.FC<{ children?: React.ReactNode; drawer?: boolean }> = ({
	children,
	drawer,
}) => {
	const user = useUser();
	const data = [
		{
			title: (
				<>
					<InlineIcon
						icon={"tabler:settings"}
						className="text-xl"
					/>{" "}
					Account
				</>
			),
			key: "account",
			href: "/user",
		},
		{
			title: (
				<>
					<InlineIcon
						icon={"mdi:security"}
						className="text-xl"
					/>{" "}
					Security
				</>
			),
			key: "security",
			href: "/user/security",
		},
		{
			title: (
				<>
					<InlineIcon
						icon={"tabler:reserved-line"}
						className="text-xl"
					/>{" "}
					Orders
				</>
			),
			key: "orders",
			href: "/user/orders",
		},
		// {
		// 	title: (
		// 		<>
		// 			<InlineIcon
		// 				icon={"icon-park-outline:share-sys"}
		// 				className="text-xl"
		// 			/>{" "}
		// 			Refer &amp; Earn
		// 		</>
		// 	),
		// 	key: "refer",
		// 	href: "/user/refer",
		// },
		// {
		// 	title: (
		// 		<>
		// 			<InlineIcon
		// 				icon={"majesticons:heart"}
		// 				className="text-xl"
		// 			/>{" "}
		// 			Saved Products{" "}
		// 			{!!user?.savedProduct?.length
		// 				? `(${user?.savedProduct?.length})`
		// 				: ""}
		// 		</>
		// 	),
		// 	key: "saved",
		// 	href: "/user/saved-products",
		// },

		{
			title: (
				<>
					<InlineIcon
						icon={"icons8:organization"}
						className="text-xl"
					/>{" "}
					Organization
				</>
			),
			key: "org",
			href: "/user/my-organization",
		},
	];
	const router = useRouter();
	const { isValidationLoading } = useAuth();

	return isValidationLoading ? (
		<main></main>
	) : (
		<main className="flex flex-row gap-2">
			{!drawer && <div className="flex-1 min-h-[70vh] px-2">{children}</div>}
			<aside
				className={`${
					!drawer ? "grow-0 hidden sm:flex border-l-2" : " flex-1"
				} flex-col gap-1 max-w-[280px]`}
			>
				<div className="p-3 px-5 bg-slate-200 rounded-md m-2">
					<h1 className="font-bold">
						{[user?.first_name || "", user?.last_name || ""]?.join(" ")}
					</h1>
					{user?.organizations?.[0] ? (
						<h2 className="text-sm text-slate-500">
							<Link href={"/user/my-organization"}>
								{user?.organizations?.[0]?.Employeeship?.designation},{" "}
								{user?.organizations?.[0]?.name}
							</Link>
						</h2>
					) : (
						<h2 className="font-semibold text-xs text-slate-600">
							{user?.phone || user?.email}
						</h2>
					)}
					{/* <div className="flex flex-row items-center gap-2 text-slate-600 text-sm mt-1 font-semibold">
						<InlineIcon
							icon={"ph:coins-duotone"}
							className="text-5xl mx-1"
						/>{" "}
						<h3 className="flex flex-col text-xs">
							<span>0 Points</span>
						</h3>
					</div> */}
				</div>
				<Divider flexItem />
				<div className="flex flex-col gap-2 p-3">
					{data?.map((n) => (
						<Link
							href={n.href}
							key={n.key}
							className={`${
								router.pathname === n.href
									? "text-primary-400 font-bold"
									: "text-slate-500 font-medium"
							} text-sm flex flex-row items-center gap-2`}
						>
							{n.title}
						</Link>
					))}
				</div>
				<Divider
					className="my-1"
					flexItem
				/>

				<b
					className="text-sm text-red-500 flex flex-row items-center gap-2 cursor-pointer p-3"
					onClick={() => {
						authService.removeToken();
					}}
				>
					<InlineIcon
						icon={"ic:round-logout"}
						className="text-xl"
					/>{" "}
					Logout
				</b>
			</aside>
		</main>
	);
};

export default UserNav;
