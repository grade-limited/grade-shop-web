import Label from "@/components/Label";
import ErrorSuffix from "@/components/antd/ErrorSuffix";
import Iconify from "@/components/iconify";
import useUser from "@/hooks/useUser";
import {
	useCreateEmployeeship,
	useGetOrganizations,
} from "@/queries/organizations";
import handleResponse from "@/utilities/handleResponse";
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
} from "@mui/material";
import { AutoComplete, Divider, Input, Space, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const NoOrg = () => {
	const user = useUser();
	const [q, setQ] = React.useState<string>("");
	const { data: search, isLoading: isSearching } = useGetOrganizations({
		search: q,
	});

	const [options, setOptions] = React.useState<any>([]);

	React.useEffect(() => {
		setOptions(
			Array.from(search?.data || []).map((item: any) => ({
				label: (
					<Space key={item.id}>
						<div>
							<p className="text-xs">{item.business_type}</p>
							<p className="font-bold">{item.name}</p>
							<p className="text-xs text-slate-500">{item.website_url}</p>
							<p className="text-xs text-slate-500">ORG#{item.id}</p>
						</div>
					</Space>
				),
				value: item.id?.toString(),
				data: item,
			}))
		);
	}, [search]);

	const [selected, setSelected] = React.useState<any>(null);
	const { handleSubmit, control, reset } = useForm();

	const { mutateAsync, isLoading } = useCreateEmployeeship();

	// On Submit Function
	const onSubmit = async (data: any) => {
		message.open({
			type: "loading",
			content: "Requesting Employeeship..",
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				mutateAsync({
					...data,
					organization_id: selected.id,
					user_id: user?.id,
				}),
			[201]
		);
		message.destroy();
		if (res.status) {
			message.success(res.message);
			reset();
			setSelected(null);
		} else {
			message.error(`${res.data?.error || res.message}. Try again later.`);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center w-full min-h-[70vh]">
			<h1 className="text-xl font-bold text-center">No Organization Found</h1>
			<p className="text-sm max-w-xs mt-1 text-slate-600 text-center">
				You are not part of any organization. You can create one or join one.
			</p>
			<AutoComplete
				menuItemSelectedIcon={<Iconify icon={"iconamoon:search-duotone"} />}
				showSearch
				allowClear
				autoClearSearchValue
				size="large"
				bordered={false}
				className="w-full mt-4 max-w-[400px] [&>.ant-select-selector]:px-6 [&>.ant-select-selector]:bg-slate-200 [&>.ant-select-selector>.ant-select-selection-search]:text-slate-700  [&>.ant-select-clear]:bg-transparent [&>.ant-select-selector]:rounded-full"
				placeholder="Search for Organization to add"
				options={options}
				onSearch={(value) => setQ(value)}
				onSelect={(_value, option) => {
					console.log(option);
					setSelected(option.data);
					setQ("");
				}}
				disabled={isLoading}
				value={q}
				notFoundContent={isSearching ? "Searching.." : "No Organization Found"}
			/>
			<Dialog
				open={!!selected}
				PaperProps={{
					className: "w-[95vw] max-w-md",
				}}
			>
				<DialogTitle className="flex text-base flex-row items-center justify-between">
					<div>
						<p className="font-bold">{selected?.name || ""}</p>
						<span className="text-sm text-slate-500">Request Employeeship</span>
					</div>
					<IconButton
						onClick={() => {
							setSelected(null);
						}}
					>
						<Iconify icon={"mdi:close"} />
					</IconButton>
				</DialogTitle>
				<Divider className="my-0" />
				<DialogContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div>
							<Controller
								control={control}
								name={"employee_id"}
								rules={{ required: true }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label isRequired>
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
								name={"business_unit"}
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
								name={"branch"}
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
								name={"depertment"}
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
								name={"designation"}
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
								name={"desk_info"}
								rules={{ required: false }}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error },
								}) => (
									<>
										<Label>
											Desk Information
											<ErrorSuffix
												error={error}
												size="small"
											/>
										</Label>
										<Input.TextArea
											placeholder={"Enter Desk Information"}
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
							className="bg-slate-800 mt-3 hover:bg-slate-700 w-full"
						>
							Send Request
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default NoOrg;
