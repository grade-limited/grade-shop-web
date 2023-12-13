import React from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import Iconify from "@/components/iconify";
import { useTranslation } from "next-i18next";

const SignOrProfile: React.FC = () => {
	const { isAuthenticated } = useAuth();
	const { t } = useTranslation("common");

	return isAuthenticated ? (
		<Link href={"/user"}>
			<IconButton color="info">
				<Iconify icon={"lucide:user"} />
			</IconButton>
		</Link>
	) : (
		<Link href={"/sign"}>
			<Button
				variant="contained"
				className="bg-primary font-bold rounded-full hidden md:flex text-white"
			>
				{t("HEADER.SIGN")}
			</Button>
		</Link>
	);
};

export default SignOrProfile;
