import Iconify from "@/components/iconify";
import {
	AppBar,
	Avatar,
	Button,
	Container,
	Divider,
	Drawer,
	IconButton,
	Toolbar,
	Tooltip,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
// import SignOrProfile from "./SignOrProfile";
const SignOrProfile = dynamic(() => import("./SignOrProfile"), {
	ssr: false,
});

import { Input } from "antd";
import { useToggle } from "@tam11a/react-use-hooks";
import { useRouter } from "next/router";
import { useAuth } from "@/service/auth";
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
	const [selectedLocation, setSelectedLocation] = React.useState<string | null>(
		null
	);

	React.useEffect(() => {
		if (!selectedLocation) {
			let temp =
				typeof window !== undefined
					? window?.localStorage?.getItem("selectedLocation") || null
					: null;
			if (temp) setSelectedLocation(temp);
			else localStorage?.removeItem?.("selectedLocation");
		} else localStorage?.setItem?.("selectedLocation", selectedLocation);
	}, [selectedLocation]);

	const {
		state: openSearch,
		toggleState: toggleSearch,
		setState: setSearch,
	} = useToggle(false);

	const {
		state: openMenu,
		toggleState: toggleMenu,
		setState: setMenu,
	} = useToggle(false);

	const router = useRouter();
	React.useEffect(() => {
		setSearch(false);
		setMenu(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	const { isAuthenticated } = useAuth();

	const { t, i18n } = useTranslation("common");

	const onToggleLanguageClick = (newLocale: string) => {
		const { pathname, asPath, query } = router;
		router.replace({ pathname, query }, asPath, { locale: newLocale });
	};

	const clientSideLanguageChange = (newLocale: string) => {
		i18n.changeLanguage(newLocale);
	};

	const changeTo = router.locale === "en" ? "bn" : "en";

	return (
		<header className="fixed w-full z-30">
			<AppBar className="shadow-none bg-slate-900 relative hidden md:flex z-0">
				<div className=" flex flex-row gap-4 justify-end py-1 px-5">
					<Typography
						variant="body2"
						className="text-xs text-slate-200 hover:text-white font-bold cursor-pointer flex flex-row gap-1 items-center"
						onClick={() => {
							onToggleLanguageClick(changeTo);
							clientSideLanguageChange(changeTo);
						}}
					>
						<Iconify icon={"material-symbols:g-translate"} />{" "}
						{t("HEADER.CHANGE_LANGUAGE")}:{" "}
						{changeTo === "bn" ? "বাংলা" : "English"}
					</Typography>
				</div>
			</AppBar>
			<AppBar className="shadow-none relative z-0 bg-slate-800">
				<Toolbar className="gap-6 relative min-h-[74px] px-5">
					<div className="md:w-64 flex flex-row items-center justify-center">
						<Link href={"/"}>
							<Avatar
								variant="square"
								src={"/logo.svg"}
								className="w-[120px] h-auto p-[2px]"
								alt="Grade Ltd."
							/>
						</Link>
					</div>
					<div className="flex-1">
						<Input
							size="large"
							bordered={false}
							placeholder={t("HEADER.SEARCH")}
							className="max-w-sm rounded-full bg-slate-600 px-4 text-white [&>input]:bg-slate-600 [&>input]:text-white [&>input]:placeholder-slate-400"
							inputMode="search"
							allowClear
						/>
					</div>

					<Link
						href={"#"}
						className="hidden md:flex flex-col items-end justify-center"
					>
						<span className="text-sm font-semibold">
							{t("HEADER.CONTACT_NUMBER")}
						</span>
						<span className="text-xs text-slate-400">
							{t("HEADER.CONTACT_SUBTITLE")}
						</span>
					</Link>
					<SignOrProfile />
					<IconButton
						color="info"
						className="inline-flex md:hidden"
						onClick={toggleMenu}
					>
						<Iconify icon={"material-symbols:menu-rounded"} />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Drawer
				anchor={"top"}
				open={openSearch}
				onClose={toggleSearch}
				PaperProps={{
					className:
						"p-5 min-h-[320px]  flex flex-col items-center justify-center",
				}}
			>
				<div className="w-[90%] mx-auto max-w-4xl">
					<IconButton
						className="float-right mb-3 mr-3"
						onClick={toggleSearch}
					>
						<Iconify icon={"ep:close-bold"} />
					</IconButton>
				</div>
			</Drawer>
			<Drawer
				anchor={"right"}
				open={openMenu}
				onClose={toggleMenu}
				PaperProps={{
					className: "w-[90vw] max-w-[250px]",
				}}
			>
				<div className="p-1">
					<IconButton
						className="float-right"
						onClick={toggleMenu}
					>
						<Iconify icon={"ep:close-bold"} />
					</IconButton>
				</div>
				<Divider
					flexItem
					className="mb-1"
				/>
				{isAuthenticated ? (
					<>{/* <UserNav drawer /> */}</>
				) : (
					<div className="p-2">
						<Link href={"/sign"}>
							<Button
								size="large"
								variant="contained"
								className="w-full bg-slate-700"
								color="primary"
							>
								{t("HEADER.SIGN")}
							</Button>
						</Link>
					</div>
				)}
			</Drawer>
		</header>
	);
};

export default Header;
