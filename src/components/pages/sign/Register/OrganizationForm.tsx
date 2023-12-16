import Iconify from "@/components/iconify";
import { useSignupOrganization } from "@/queries/auth";
import handleResponse from "@/utilities/handleResponse";
import { Button, DialogActions } from "@mui/material";
import { Steps, message } from "antd";
import React from "react";
import { useForm } from "react-hook-form";

const OrganizationForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const { handleSubmit, control, reset } = useForm({
		// resolver: joiResolver(resolver),
	});
	const steps = [
		{
			title: "Details",
			description: "Information",
			content: "First-content",
			icon: <Iconify icon="gg:organisation" />,
		},
		{
			title: "Type",
			description: "Type/Sub-type",
			content: "Second-content",
			icon: <Iconify icon="fluent-mdl2:org" />,
		},
		{
			title: "Contact Info",
			description: "Personal",
			content: "Last-content",
			icon: <Iconify icon="ic:round-contact-phone" />,
		},
	];

	const [current, setCurrent] = React.useState(0);

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
		subTitle: item.description,
		icon: item.icon,
	}));

	const { mutateAsync: mutateSignup, isLoading: isSignupLoading } =
		useSignupOrganization();

	const onSubmit = async (data: any) => {
		message.open({
			type: "loading",
			content: "Requesting New Organization..",
			duration: 0,
		});
		const res = await handleResponse(() => mutateSignup(data), [201]);
		message.destroy();
		if (res.status) {
			reset();
			message.success(res.message);
			onClose();
		} else {
			message.error(res.message);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Steps
					current={current}
					items={items}
					// percent={60}
					labelPlacement="vertical"
					size="small"
					className="px-6"
				/>
				<div className="px-4 my-5">{steps[current].content}</div>
				<DialogActions className="px-3 pb-1">
					{current > 0 && (
						<Button
							variant="outlined"
							size="small"
							disabled={isSignupLoading}
							onClick={() => prev()}
						>
							Previous
						</Button>
					)}
					{current < steps.length - 1 && (
						<Button
							color="primary"
							size="small"
							variant="contained"
							className="bg-primary hover:bg-primary-600"
							onClick={() => next()}
							disabled={isSignupLoading}
						>
							Next
						</Button>
					)}
					{current === steps.length - 1 && (
						<Button
							className="bg-primary hover:bg-primary-600"
							variant="contained"
							size="small"
							color="primary"
							type="submit"
							disabled={isSignupLoading}
						>
							Done
						</Button>
					)}
				</DialogActions>
			</form>
		</>
	);
};

export default OrganizationForm;
