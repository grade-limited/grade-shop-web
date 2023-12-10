import ErrorSuffix from "@/components/antd/ErrorSuffix";
import { message } from "@/components/antd/message";
import Iconify from "@/components/iconify";
import UserNav from "@/components/pages/user/nav";
import { withAuth } from "@/hoc/auth";
import useUser from "@/hooks/useUser";
import { useUpdatePassword } from "@/queries/auth";
import handleResponse from "@/utilities/handleResponse";
import { InlineIcon } from "@iconify/react";
import { Button, Typography } from "@mui/material";
import { Input } from "antd";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const Security = () => {
	const { reset, handleSubmit, control } = useForm({});

	const { mutateAsync, isLoading } = useUpdatePassword();

	const onSubmit = async (data: any) => {
		if (data.password !== data.cpassword) {
			message.error("New password didn't match!");
			return;
		}

		message.open({
			type: "loading",
			content: "Updating Information...",
			duration: 0,
		});

		const res = await handleResponse(
			() =>
				mutateAsync({
					current_password: data.currentPassword,
					new_password: data.password,
				}),
			[200]
		);
		message.destroy();
		if (res.status) {
			message.success(res.message);
			reset();
		} else {
			message.error(res.message || "Something went wrong!");
		}
	};
	return (
		<UserNav>
			<>
				<form
					className="max-w-xs mx-auto"
					onSubmit={handleSubmit(onSubmit)}
				>
					<h1 className="font-medium text-2xl my-5 flex flex-row items-center gap-2">
						<InlineIcon
							icon={"mdi:security"}
							className="text-3xl"
						/>{" "}
						Update Security
					</h1>
					<div className="my-3">
						<Controller
							control={control}
							name={"currentPassword"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<>
									<Typography
										variant="caption"
										className="flex flex-row items-center gap-1 mb-2 uppercase"
									>
										Password
										<ErrorSuffix
											error={error}
											size="small"
										/>
									</Typography>
									<Input.Password
										prefix={
											<Iconify
												icon="ri:lock-password-line"
												color="#999"
												className="mr-1 text-xl"
											/>
										}
										placeholder={"Password"}
										size="large"
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
										// suffix={}
									/>
								</>
							)}
						/>
					</div>
					<div className="my-3">
						<Controller
							control={control}
							name={"password"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<>
									<Typography
										variant="caption"
										className="flex flex-row items-center gap-1 mb-2 uppercase"
									>
										Create New Password
										<ErrorSuffix
											error={error}
											size="small"
										/>
									</Typography>
									<Input.Password
										prefix={
											<Iconify
												icon="ri:lock-password-line"
												color="#999"
												className="mr-1 text-xl"
											/>
										}
										placeholder={"Password"}
										size="large"
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
										// suffix={}
									/>
								</>
							)}
						/>
					</div>
					<div className="my-3">
						<Controller
							control={control}
							name={"cpassword"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<>
									<Typography
										variant="caption"
										className="flex flex-row items-center gap-1 mb-2 uppercase"
									>
										Confirm New Password
										<ErrorSuffix
											error={error}
											size="small"
										/>
									</Typography>
									<Input.Password
										prefix={
											<Iconify
												icon="ri:lock-password-line"
												color="#999"
												className="mr-1 text-xl"
											/>
										}
										placeholder={"Password"}
										size="large"
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										status={error ? "error" : ""}
										// suffix={}
									/>
								</>
							)}
						/>
					</div>

					<Button
						variant="contained"
						fullWidth
						size="large"
						className="bg-slate-700"
						type="submit"
						disabled={isLoading}
					>
						Update Information
					</Button>
				</form>
			</>
		</UserNav>
	);
};

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale ?? "en", ["common"])),
			// Will be passed to the page component as props
		},
	};
}

export default withAuth(Security);
