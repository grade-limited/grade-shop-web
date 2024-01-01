import Iconify from "@/components/iconify";
import useUser from "@/hooks/useUser";
import { useGetOrganizations } from "@/queries/organizations";
import { AutoComplete, Space } from "antd";
import React from "react";

const NoOrg = () => {
	const user = useUser();
	const [q, setQ] = React.useState<string>("");
	const { data: search } = useGetOrganizations({
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
						</div>
					</Space>
				),
				value: item.id?.toString(),
				data: item,
			}))
		);
	}, [search]);

	console.log(search, options);
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
				// onSelect={(value) => {
				// 	navigate(`/product/${value}`);
				// 	setQ("");
				// }}
				value={q}
				notFoundContent={"No Organization Found"}
				// optionRender={(option: any) => (
				// 	<Space key={option.data.id}>
				// 		<div>
				// 			{/* <p className="text-xs">{option.data?.data?.brand}</p> */}
				// 			<p className="font-bold">{option.label}</p>
				// 			{/* <p className="text-xs font-semibold">
				// 				${option.data?.data?.price}
				// 			</p> */}
				// 		</div>
				// 	</Space>
				// )}
			/>
		</div>
	);
};

export default NoOrg;
