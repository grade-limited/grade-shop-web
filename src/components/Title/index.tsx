import {
	Typography,
	TypographyPropsVariantOverrides,
	TypographyVariantsOptions,
} from "@mui/material";
import React from "react";

const Title: React.FC<{
	variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	label?: React.ReactNode;
	children?: React.ReactNode;
}> = ({ label, children, variant = "h4" }) => {
	return (
		<Typography
			variant={variant}
			className="text-center font-medium text-[1.9em]"
		>
			{children || label}
		</Typography>
	);
};

export default Title;
