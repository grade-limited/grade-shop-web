import useUser from "@/hooks/useUser";
import { useGetOrganizationsById } from "@/queries/organizations";
import React from "react";
import NoOrg from "./no-org";
import { Descriptions } from "antd";

const Org: React.FC = () => {
	const user = useUser();
	const organization = user?.organizations?.[0];
	if (!organization) return <NoOrg />;
	const employeeship = organization?.Employeeship;
	console.log(organization);
	return (
		<div>
			<div className="py-4 px-5 bg-white rounded-md shadow-sm">
				<p className="text-sm font-semibold text-slate-700">
					ORG#{organization?.id}
				</p>
				<h2 className="font-bold text-slate-800 text-xl">
					{organization?.name}
				</h2>
				<p className="text-sm text-slate-800">
					{organization?.business_type} ({organization?.business_subtype})
				</p>
				<p className="text-sm text-slate-800">{organization?.website_url}</p>
				<p className="text-sm text-slate-800">{organization?.facebook_url}</p>
				<p className="text-sm text-slate-800">{organization?.instagram_url}</p>
				<p className="text-sm text-slate-800">{organization?.linkedin_url}</p>
			</div>
			<div className="py-4 px-5 bg-white rounded-md shadow-sm my-3">
				<Descriptions
					layout="vertical"
					bordered
					title="Employeeship Details"
				>
					<Descriptions.Item label="Employee ID">
						{employeeship?.employee_id || "N/A"}
					</Descriptions.Item>
					<Descriptions.Item label="Designation">
						{employeeship?.designation || "N/A"}
					</Descriptions.Item>
					<Descriptions.Item label="Business Unit">
						{employeeship?.business_unit || "N/A"}
					</Descriptions.Item>
					<Descriptions.Item label="Branch">
						{employeeship?.branch || "N/A"}
					</Descriptions.Item>
					<Descriptions.Item label="Depertment">
						{employeeship?.depertment || "N/A"}
					</Descriptions.Item>
					<Descriptions.Item label="Desk Information">
						{employeeship?.desk_info || "N/A"}
					</Descriptions.Item>
				</Descriptions>
			</div>
		</div>
	);
};

export default Org;
