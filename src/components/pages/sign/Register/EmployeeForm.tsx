import React from "react";
import Joi from "joi";
import Label from "@/components/Label";
import { Input, Segmented, Select, message } from "antd";
import handleResponse from "@/utilities/handleResponse";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import ErrorSuffix from "@/components/antd/ErrorSuffix";
import { Button } from "@mui/material";
import { useSignup } from "@/queries/auth";

export const resolver = Joi.object({
	first_name: Joi.string().required().label("First Name").trim(),
	last_name: Joi.string().required().label("Last Name").trim(),
	gender: Joi.string().label("Gender").trim(),
	password: Joi.string().label("Password").trim().required(),
	email: Joi.string()
		.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
		.label("Email")
		.messages({
			"string.pattern.base": "Invalid Email Address",
		})
		.allow("")
		.allow(null)
		.trim(),
	phone: Joi.string()
		.pattern(/01\d{9}$/)
		.label("Phone")
		.messages({
			"string.pattern.base": "Invalid Phone Number",
		})
		.required()
		.trim(),
	// primary_contact: Joi.string()
	// 	.valid("phone", "email")
	// 	.required()
	// 	.default("phone"),
	referral_code: Joi.string()
		.label("Referral Code")
		.trim()
		.allow("")
		.allow(null),
});

const EmployeeForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const { handleSubmit, control, reset } = useForm({
		resolver: joiResolver(resolver),
	});

	const { mutateAsync: mutateSignup, isLoading: isSignupLoading } = useSignup();

	// On Submit Function
	const onSubmit = async (data: any) => {
		message.open({
			type: "loading",
			content: "Registering Account..",
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
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-xl mb-4 mx-auto flex flex-col gap-2"
			>
				<div>
					<Label isRequired>Full Name</Label>
					<Input.Group compact>
						<Controller
							control={control}
							name={"first_name"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									className="w-1/2"
									placeholder={"Enter First Name"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
									suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>
						<Controller
							control={control}
							name={"last_name"}
							rules={{ required: true }}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									className="w-1/2"
									placeholder={"Enter Last Name"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
									suffix={<ErrorSuffix error={error} />}
								/>
							)}
						/>
					</Input.Group>
				</div>
				<div>
					<Controller
						control={control}
						name={"gender"}
						rules={{ required: false }}
						defaultValue={"Male"}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<>
								<Label>
									Gender
									<ErrorSuffix
										error={error}
										size="small"
									/>
								</Label>
								<Segmented
									placeholder={"Gender"}
									size={"large"}
									className="relative w-full p-1 bg-slate-100 [&>.ant-segmented-group>.ant-segmented-item]:w-full"
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									options={[
										{ value: "Male", label: "Male" },
										{ value: "Female", label: "Female" },
										{ value: "Non Binary", label: "Non Binary" },
									]}
								/>
							</>
						)}
					/>
				</div>
				<div>
					<Controller
						control={control}
						name={"email"}
						rules={{ required: false }}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<>
								<Label>
									Email
									<ErrorSuffix
										error={error}
										size="small"
									/>
								</Label>
								<Input
									placeholder={"Enter Email Address"}
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
						name={"phone"}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<>
								<Label isRequired>
									Phone
									<ErrorSuffix
										error={error}
										size="small"
									/>
								</Label>
								<Input
									// readOnly
									// disabled
									placeholder={"Enter Phone Number"}
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
						name={"password"}
						rules={{ required: false }}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<>
								<Label isRequired>
									Password
									<ErrorSuffix
										error={error}
										size="small"
									/>
								</Label>
								<Input.Password
									placeholder={"Password"}
									size={"large"}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
								/>
							</>
						)}
					/>
				</div>
				<div>
					<Controller
						control={control}
						name={"referral_code"}
						rules={{ required: false }}
						render={({
							field: { onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<>
								<Label>
									Referral Code
									<ErrorSuffix
										error={error}
										size="small"
									/>
								</Label>
								<Input
									// readOnly
									// disabled
									placeholder={"Enter Referral Code"}
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
				<Button
					type="submit"
					size="large"
					variant="contained"
					color="primary"
					className="bg-primary-600 mt-3 hover:bg-primary-700"
				>
					Submit
				</Button>
			</form>
		</>
	);
};

export default EmployeeForm;
