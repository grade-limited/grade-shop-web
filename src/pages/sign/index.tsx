import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { withoutAuth } from "@/hoc/auth";
import { Button, Container, Typography } from "@mui/material";
import { Input, Segmented } from "antd";
import Iconify from "@/components/iconify";
import Link from "next/link";
import Joi from "joi";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Label from "@/components/Label";
import ErrorSuffix from "@/components/antd/ErrorSuffix";
import { message } from "@/components/antd/message";
import handleResponse from "@/utilities/handleResponse";
import { authService } from "@/service/auth";
import { useLogin } from "@/queries/auth";
import { SegmentedValue } from "antd/es/segmented";
import { useToggle } from "@tam11a/react-use-hooks";
import Register from "@/components/pages/sign/Register";

function Sign() {
	const { t } = useTranslation("signin");

	const loginResolver = Joi.object({
		type: Joi.string().valid("phone", "email").required().default("phone"),
		phone: Joi.alternatives().conditional("type", {
			is: "phone",
			then: Joi.string()
				.label("Phone Number")
				.pattern(/01\d{9}$/)
				.required()
				.messages({
					"string.pattern.base": "Invalid Phone Number",
				}),
			otherwise: Joi.string().allow("").optional(),
		}),
		email: Joi.alternatives().conditional("type", {
			is: "email",
			then: Joi.string()
				.label("Email")
				.email({ tlds: { allow: false } })
				.required(),
			otherwise: Joi.string().allow("").optional(),
		}),
		password: Joi.string().label("Password").min(6).required(),
		remember: Joi.boolean().default(true),
	});

	const {
		// reset,
		handleSubmit,
		control,
		watch,
		setValue,
	} = useForm({
		resolver: joiResolver(loginResolver),
		defaultValues: {
			type: "phone",
			phone: "",
			email: "",
			password: "",
			remember: true,
		},
	});

	const { mutateAsync: mutateLogin, isLoading: isLoginLoading } = useLogin();

	const onSubmit = async (data: any) => {
		const { type, phone, email, password } = data;
		message.open({
			type: "loading",
			content: "Logging in..",
			duration: 0,
		});

		const res = await handleResponse(() =>
			mutateLogin({
				...(type === "phone" ? { phone } : { email }),
				password,
			})
		);
		message.destroy();
		if (res.status && !!res.data?.jwt) {
			message.success(res.message || "Logged in successfully!");
			authService.setToken(res.data.jwt);
		} else {
			message.error(res.message || "Something went wrong!");
			if (res.data?.isVerified === false) {
				console.log("Not Verified Yet!");
			}
		}
	};

	const { state, toggleState } = useToggle(false);

	return (
		<>
			<Head>
				<title>
					{t("META.TITLE", {
						ns: "common",
					}).toString()}
				</title>
				<meta
					name="description"
					content={t("META.DESCRIPTION", {
						ns: "common",
					}).toString()}
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<main>
				<Container
					maxWidth="md"
					className="mx-auto bg-white my-2 py-8 px-4 rounded-md flex flex-col items-center justify-center"
				>
					<h2 className="text-2xl mb-3 text-center font-semibold">
						{t("SIGNIN.WELCOME")} <br />{" "}
						<span className="text-base">{t("SIGNIN.WELCOME_TEXT")}</span>
					</h2>
					<Segmented
						value={watch("type") as SegmentedValue}
						onChange={(value) => setValue("type", value as string)}
						options={[
							{
								label: t("SIGNIN.OPTIONS.PHONE"),
								value: "phone",
								icon: (
									<Iconify
										icon="ph:phone-duotone"
										className="inline-flex"
									/>
								),
							},
							{
								label: t("SIGNIN.OPTIONS.EMAIL"),
								value: "email",
								icon: (
									<Iconify
										icon="ic:twotone-email"
										className="inline-flex"
									/>
								),
							},
						]}
						size="large"
						className="rounded-full text-slate-700 font-bold [&>.ant-segmented-group>.ant-segmented-item-selected]:rounded-full p-2 bg-slate-200"
					/>
					<form
						className="mt-7"
						onSubmit={handleSubmit(onSubmit)}
					>
						{watch("type") === "email" && (
							<>
								<div>
									<Label isRequired>{t("SIGNIN.EMAIL_ADDRESS")}</Label>
									<Controller
										control={control}
										name={"email"}
										rules={{ required: true }}
										render={({
											field: { onChange, onBlur, value },
											fieldState: { error },
										}) => (
											<Input
												prefix={
													<Iconify
														icon="ic:baseline-alternate-email"
														color="#999"
														className="mr-1 text-xl"
													/>
												}
												placeholder={"Email"}
												size={"large"}
												onChange={onChange}
												className="rounded-full"
												onBlur={onBlur}
												value={value}
												status={error ? "error" : ""}
												suffix={<ErrorSuffix error={error} />}
											/>
										)}
									/>
								</div>
							</>
						)}
						{watch("type") === "phone" && (
							<>
								<div>
									<Label isRequired>{t("SIGNIN.PHONE_NUMBER")}</Label>
									<Controller
										control={control}
										name={"phone"}
										rules={{ required: true }}
										render={({
											field: { onChange, onBlur, value },
											fieldState: { error },
										}) => (
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
												onChange={onChange}
												className="rounded-full"
												onBlur={onBlur}
												value={value}
												status={error ? "error" : ""}
												suffix={<ErrorSuffix error={error} />}
											/>
										)}
									/>
								</div>
							</>
						)}
						<div>
							<Controller
								control={control}
								name={"password"}
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
											{t("SIGNIN.PASSWORD")}
										</Label>
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
											className="rounded-full"
											value={value}
											status={error ? "error" : ""}
											autoComplete="off"
											defaultValue={""}
											// suffix={}
										/>
									</>
								)}
							/>
						</div>
						{/* <Link
							href={"/sign/recover"}
							className="w-fit mx-auto"
						>
							<Typography
								variant="caption"
								className="mt-4 float-right font-bold"
							>
								{t("SIGNIN.FORGET_PASSWORD")}
							</Typography>
						</Link> */}
						<Button
							size="large"
							variant="contained"
							type="submit"
							color="primary"
							fullWidth
							className="bg-slate-700 rounded-full mt-3 mb-6"
							disabled={isLoginLoading}
							// onClick={() => {
							// 	authService.setToken("HELLOHERESTOKEN!!");
							// }}
						>
							{t("SIGNIN.SIGN_IN")}
						</Button>

						<div className="w-full grid items-center">
							<Typography
								variant="subtitle2"
								className="flex flex-row items-center gap-2 font-semibold text-center w-fit cursor-pointer mx-auto"
								onClick={toggleState}
							>
								<span>{t("SIGNIN.DONT_HAVE_ANY_ACCOUNT")}</span>
								<Iconify icon={"material-symbols:arrow-forward-ios"} />
							</Typography>
						</div>
					</form>
					<Register
						open={state}
						onClose={toggleState}
					/>
				</Container>
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {
			...(await serverSideTranslations(context.locale ?? "en", [
				"common",
				"signin",
			])),
			// Will be passed to the page component as props
		},
	};
};

export default withoutAuth(Sign);
