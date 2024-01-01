import Label from "@/components/Label";
import ErrorSuffix from "@/components/antd/ErrorSuffix";
import Iconify from "@/components/iconify";
import { useSignupOrganization } from "@/queries/auth";
import { IOption } from "@/types";
import handleResponse from "@/utilities/handleResponse";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, DialogActions } from "@mui/material";
import { Cascader, Divider, Input, Segmented, Steps, message } from "antd";
import Joi from "joi";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export const resolver = Joi.object({
	organization_name: Joi.string().required().label("Organization Name").trim(),
	businessType: Joi.array().label("Business Type").required(),
	contact_address: Joi.string()
		.label("Organization Contact Address")
		.trim()
		.required(),
	contact_number: Joi.string()
		.pattern(/01\d{9}$/)
		.label("Organization Contact Phone")
		.messages({
			"string.pattern.base": "Invalid Organization Contact Phone Number",
		})
		.required()
		.trim(),
	contact_email: Joi.string()
		.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
		.label("Organization Contact Email")
		.messages({
			"string.pattern.base": "Invalid Organization Contact Email Address",
		})
		.allow("")
		.allow(null)
		.trim(),

	facebook_url: Joi.string()
		.pattern(
			/(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/
		)
		.label("Facebook URL")
		.allow("")
		.allow(null),
	website_url: Joi.string()
		.label("Website URL")
		.pattern(
			/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
		)
		.allow("")
		.allow(null),
	linkedin_url: Joi.string()
		.pattern(
			/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
		)
		.label("LinkedIn URL")
		.allow("")
		.allow(null),
	instagram_url: Joi.string()
		.pattern(/(https?:\/\/(?:www\.)?instagram\.com\/p\/([^/?#&]+)).*/)
		.label("Instagram URL")
		.allow("")
		.allow(null),
	contact_person_name: Joi.string()
		.required()
		.label("Contact Person Name")
		.trim(),
	contact_person_phone: Joi.string()
		.pattern(/01\d{9}$/)
		.label("Contact Person's Phone")
		.messages({
			"string.pattern.base": "Invalid Contact Perosn's Phone Number",
		})
		.required()
		.trim(),
	contact_person_address: Joi.string().label("Contact Person's Address").trim(),
	contact_person_employee_id: Joi.string()
		.label("Contact Person's Employee ID")
		.trim(),
	contact_person_dept: Joi.string()
		.label("Contact Person's Department")
		.required()
		.trim(),
	contact_person_designation: Joi.string()
		.label("Contact Person's Designation")
		.required()
		.trim(),
	contact_person_branch: Joi.string()
		.label("Contact Person's Branch")
		.required()
		.trim(),
	contact_person_desk_information: Joi.string()
		.label("Contact Person's Desk Info")
		.trim(),
	contact_person_business_unit: Joi.string()
		.label("Contact Person's Business Unit")
		.trim(),
});

const OrganizationForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const { handleSubmit, control, reset, getValues } = useForm({
		resolver: joiResolver(resolver),
		defaultValues: {
			organization_name: undefined,
			businessType: undefined,
			contact_address: undefined,
			contact_number: undefined,
			contact_email: undefined,
			facebook_url: undefined,
			website_url: undefined,
			linkedin_url: undefined,
			instagram_url: undefined,
			contact_person_name: undefined,
			contact_person_phone: undefined,
			contact_person_address: undefined,
			contact_person_employee_id: undefined,
			contact_person_dept: undefined,
			contact_person_designation: undefined,
			contact_person_branch: undefined,
			contact_person_desk_information: undefined,
			contact_person_business_unit: undefined,
		},
	});

	// const [current, setCurrent] = React.useState(0);

	// const next = () => {
	// 	setCurrent(current + 1);
	// };

	// const prev = () => {
	// 	setCurrent(current - 1);
	// };

	const { mutateAsync: mutateSignup, isLoading: isSignupLoading } =
		useSignupOrganization();

	const onSubmit = async (data: any) => {
		message.open({
			type: "loading",
			content: "Requesting New Organization..",
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				mutateSignup({
					...data,
					business_type: data?.businessType?.[0],
					business_subtype: data?.businessType?.[1],
				}),
			[201]
		);
		message.destroy();
		if (res.status) {
			reset();
			message.success(res.message);
			onClose();
		} else {
			message.error(res.message);
		}
	};
	const typeData: IOption[] = [
		{
			value: "Retail Shop",
			label: "Retail Shop",
			children: [
				{
					value: "Grocery",
					label: "Grocery",
				},
				{
					value: "Stationary",
					label: "Stationary",
				},
				{
					value: "Mobile ACC",
					label: "Mobile ACC",
				},
				{
					value: "Others",
					label: "Others",
				},
			],
		},
		{
			value: "Hotel/Restaurant",
			label: "Hotel & Restaurants",
			children: [
				{
					value: "Hotel",
					label: "Hotel",
				},
				{
					value: "Restaurant",
					label: "Restaurant",
				},
				{
					value: "Cafe",
					label: "Cafe",
				},
			],
		},
		{
			value: "Corporate Company",
			label: "Corporate Company",
			children: [
				{
					value: "Pharmacy & Hospitals",
					label: "Pharmacy & Hospitals",
				},
				{
					value: "Finance Institution",
					label: "Finance Institution",
				},
				{
					value: "Manufacturing Industry",
					label: "Manufacturing Industry",
				},
				{
					value: "NGO",
					label: "NGO",
				},
				{
					value: "Educational",
					label: "Educational",
				},
				{
					value: "Others",
					label: "Others",
				},
			],
		},
	];

	const steps = [
		{
			title: "Organization Details",
			description: "Basic Information",
			content: (
				<>
					<div className="max-w-xl mb-4 mx-auto flex flex-col gap-2 px-3">
						<div>
							<Controller
								control={control}
								name={"organization_name"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label isRequired>
											Name
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"Enter Organization Name"}
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
								name={"contact_email"}
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
											// readOnly
											// disabled
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
								name={"contact_number"}
								rules={{ required: true }}
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
								name={"contact_address"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label isRequired>
											Address
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input.TextArea
											placeholder={"Enter Address"}
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
								name={"website_url"}
								rules={{ required: false }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label>
											Website
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"eg: https://www.mywebsite.com"}
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
								name={"linkedin_url"}
								rules={{ required: false }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label>
											LinkedIn Profile
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"eg: https://www.linkedin.com/in/username/"}
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
								name={"facebook_url"}
								rules={{ required: false }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label>
											Facebook Profile
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"eg: https://www.facebook.com/username/"}
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
								name={"instagram_url"}
								rules={{ required: false }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label>
											Instagram Profile
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"eg: https://www.instagram.com/username"}
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
					</div>
				</>
			),
			icon: <Iconify icon="gg:organisation" />,
		},
		{
			title: "Organization Type",
			description: "Business Information",
			content: (
				<>
					<div className="max-w-xl mb-4 mx-auto flex flex-col gap-2 px-3">
						<div>
							<Controller
								control={control}
								name={"businessType"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label
											isRequired
											className="my-1"
										>
											Business Type
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Cascader
											size={"large"}
											placeholder={"Search Organization Type, Subtype.."}
											className="relative w-full"
											allowClear={false}
											value={value}
											showSearch
											options={typeData}
											onChange={onChange}
											onBlur={onBlur}
											status={error ? "error" : ""}
										/>
									</>
								)}
							/>
						</div>
					</div>
				</>
			),
			icon: <Iconify icon="fluent-mdl2:org" />,
		},
		{
			title: "Contact Person",
			description: "Personal Information",
			content: (
				<>
					<div className="max-w-xl mb-4 mx-auto flex flex-col gap-2 px-3">
						<div>
							<Controller
								control={control}
								name={"contact_person_name"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label isRequired>
											Full Name
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"Enter Full Name"}
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
								name={"contact_person_phone"}
								rules={{ required: true }}
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
								name={"contact_person_address"}
								rules={{ required: false }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label>
											Address
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input.TextArea
											placeholder={"Enter Address"}
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
								name={"contact_person_employee_id"}
								rules={{ required: false }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label>
											Employee ID
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"Enter Employee ID"}
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
								name={"contact_person_business_unit"}
								rules={{ required: false }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label>
											Business Unit
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"Enter Business Unit"}
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
								name={"contact_person_branch"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label isRequired>
											Branch
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"Enter The Branch Currently Working In"}
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
								name={"contact_person_dept"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label isRequired>
											Department
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"Enter The Department Currently Working In"}
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
								name={"contact_person_designation"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label isRequired>
											Designation
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"Enter Currernt Designation"}
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
								name={"contact_person_desk_information"}
								rules={{ required: false }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label>
											Desk Info
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input
											placeholder={"Enter Desk Info"}
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
					</div>
				</>
			),
			icon: <Iconify icon="ic:round-contact-phone" />,
		},
	];

	// const items = steps.map((item) => ({
	// 	key: item.title,
	// 	title: item.title,
	// 	subTitle: item.description,
	// 	icon: item.icon,
	// }));
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* <Steps
					current={current}
					items={items}
					// percent={60}
					labelPlacement="vertical"
					size="small"
					className="px-6"
				/> */}
				{/* <div className="px-4 my-5">{steps[current].content}</div>
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
				</DialogActions> */}
				{Array.isArray(steps) &&
					steps.map((item, index) => (
						<React.Fragment key={index}>
							<div className="bg-slate-50 border mx-7 p-2 rounded my-3">
								<p className="text-slate-700 max-w-xl mx-auto font-bold p-3 pb-1">
									{item.title}
								</p>
								<p className="text-slate-600 text-xs p-3 mb-2 pt-0 max-w-xl mx-auto">
									{item.description}
								</p>
								{item.content}
							</div>
						</React.Fragment>
					))}
				<div className="px-7 pb-5">
					<Button
						type="submit"
						size="large"
						variant="contained"
						color="primary"
						className="bg-primary-600 mt-3 hover:bg-primary-700 w-full"
					>
						Submit
					</Button>
				</div>
			</form>
		</>
	);
};

export default OrganizationForm;
