import React from "react";
import { withAuth } from "@/hoc/auth";
import { Button } from "@mui/material";
import useUser from "@/hooks/useUser";
import { Input, message } from "antd";
import UserNav from "@/components/pages/user/nav";
import { Controller, useForm } from "react-hook-form";
import Label from "@/components/Label";
import Iconify from "@/components/iconify";
import ErrorSuffix from "@/components/antd/ErrorSuffix";
import { InlineIcon } from "@iconify/react";
import { useUpdateUserInfo } from "@/queries/auth";
import handleResponse from "@/utilities/handleResponse";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const registerResolver = Joi.object({
	first_name: Joi.string().label("First Name").required().trim(),
	last_name: Joi.string().label("Last Name").required().trim(),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.label("Email")
		.regex(/^[a-z0-9_]+(?:\.[a-z0-9_]+)*@[a-z0-9]+\.[a-z]{2,4}(?:\.com)?$/)
		.required()
		.messages({
			"string.pattern.base": "Invalid Email Address",
		})
		.trim(),
	phone: Joi.string()
		.label("Phone Number")
		.pattern(/01\d{9}$/)
		.required()
		.messages({
			"string.pattern.base": "Invalid Phone Number",
		})
		.trim(),
	address: Joi.string().label("Address").trim().allow("").allow(null),
});

const User = () => {
	const user = useUser();

	const { reset, handleSubmit, control } = useForm({
		resolver: joiResolver(registerResolver),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			address: "",
		},
	});

	const { mutateAsync, isLoading } = useUpdateUserInfo();

	const onSubmit = async (data: any) => {
		message.open({
			type: "loading",
			content: "Updating Information...",
			duration: 0,
		});

		const res = await handleResponse(() => mutateAsync(data), [201]);
		message.destroy();
		if (res.status) {
			message.success("Updated information successfully!");
		} else {
			message.error(res.message || "Something went wrong!");
		}
	};

	React.useEffect(() => {
		reset({
			first_name: user?.first_name,
			last_name: user?.last_name,
			phone: user?.phone,
			email: user?.email,
			address: user?.address,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		user?.first_name,
		user?.last_name,
		user?.phone,
		user?.email,
		user?.address,
	]);

	return (
		<div>
			<UserNav>
				<>
					<form
						className="max-w-md mx-auto"
						onSubmit={handleSubmit(onSubmit)}
					>
						<h1 className="font-medium text-2xl my-5 flex flex-row items-center gap-2">
							<InlineIcon
								icon={"tabler:settings"}
								className="text-3xl"
							/>{" "}
							Account Details
						</h1>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							<div>
								<Controller
									control={control}
									name={"first_name"}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<>
											<Label
												isRequired
												info={error?.message}
											>
												First Name
											</Label>
											<Input
												prefix={
													<Iconify
														icon="gg:rename"
														color="#999"
														className="mr-1 text-xl"
													/>
												}
												placeholder={"First Name"}
												size={"large"}
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												status={error ? "error" : ""}
												//   suffix={<ErrorSuffix error={error} />}
											/>
										</>
									)}
								/>
							</div>
							<div>
								<Controller
									control={control}
									name={"last_name"}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<>
											<Label
												isRequired
												info={error?.message}
											>
												Last Name
											</Label>
											<Input
												prefix={
													<Iconify
														icon="gg:rename"
														color="#999"
														className="mr-1 text-xl"
													/>
												}
												placeholder={"Last Name"}
												size={"large"}
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												status={error ? "error" : ""}
												// suffix={<ErrorSuffix error={error} />}
											/>
										</>
									)}
								/>
							</div>
							<div>
								<Controller
									control={control}
									name={"email"}
									rules={{
										required: true,
									}}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										// console.log()

										<>
											<Label
												isRequired
												info={error?.message}
											>
												Email Address
											</Label>
											<Input
												prefix={
													<Iconify
														icon="ic:twotone-alternate-email"
														color="#999"
														className="mr-1 text-xl"
													/>
												}
												placeholder={"Email"}
												size={"large"}
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												status={error ? "error" : ""}
												// suffix={<ErrorSuffix error={error} />}
											/>
										</>
									)}
								/>
							</div>
							<div>
								<Controller
									control={control}
									name={"phone"}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<>
											<Label
												isRequired
												info={error?.message}
											>
												Phone Number
											</Label>
											<Input
												prefix={
													<Iconify
														icon="ph:phone"
														color="#999"
														className="mr-1 text-xl"
													/>
												}
												placeholder={"Phone Number"}
												size={"large"}
												readOnly
												disabled
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												status={error ? "error" : ""}
												//   suffix={<ErrorSuffix error={error} />}
											/>
										</>
									)}
								/>
							</div>
						</div>
						<div className="my-2">
							<Controller
								control={control}
								name={"address"}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label info={error?.message}>Address</Label>
										<Input.TextArea
											placeholder={"Address"}
											size={"large"}
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
											rows={7}
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
		</div>
	);
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	try {
// 		const auth = new AuthService();
// 		auth.setContext(context);

// 		return {
// 			props: {
// 				data: {
// 					token: `${auth.getToken()}`,
// 				},
// 			},
// 		};
// 	} catch {
// 		return {
// 			notFound: true,
// 		};
// 	}
// };

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale ?? "en", ["common"])),
			// Will be passed to the page component as props
		},
	};
}

export default withAuth(User);
