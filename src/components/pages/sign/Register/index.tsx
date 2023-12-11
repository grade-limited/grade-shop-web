import Iconify from "@/components/iconify";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Divider, Segmented } from "antd";
import React from "react";
import EmployeeForm from "./EmployeeForm";
import OrganizationForm from "./OrganizationForm";

const Register: React.FC<{
	open: boolean;
	onClose: () => void;
}> = ({ open, onClose }) => {
	const [type, setType] = React.useState<"employee" | "organization">(
		"employee"
	);
	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				className: "w-full max-w-xl rounded-lg",
			}}
		>
			<DialogTitle className="flex flex-row items-center justify-between">
				<h1 className="font-bold text-base">
					Register <br />{" "}
					<span className="text-sm font-semibold text-slate-500">
						New <span className="capitalize">{type} Account</span>
					</span>
				</h1>
				<IconButton onClick={onClose}>
					<Iconify icon="mdi:close" />
				</IconButton>
			</DialogTitle>
			<Divider className="my-0" />
			<DialogContent className="pb-2">
				<div className="flex flex-row items-center justify-center">
					<Segmented
						value={type}
						onChange={(v) => setType(v as "employee" | "organization")}
						options={[
							{
								label: "Employee",
								value: "employee",
								icon: (
									<Iconify
										icon="clarity:employee-solid"
										className="inline-flex"
									/>
								),
							},
							{
								label: "Organization",
								value: "organization",
								icon: (
									<Iconify
										icon="grommet-icons:organization"
										className="inline-flex"
									/>
								),
							},
						]}
						size="large"
						className="rounded-full text-slate-700 font-bold [&>.ant-segmented-group>.ant-segmented-item-selected]:rounded-full p-2 bg-slate-200"
					/>
				</div>
				<div className="mt-4">
					{type === "employee" ? (
						<EmployeeForm onClose={onClose} />
					) : (
						<OrganizationForm />
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Register;
