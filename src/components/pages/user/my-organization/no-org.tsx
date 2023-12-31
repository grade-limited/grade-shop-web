import useUser from "@/hooks/useUser";
import React from "react";

const NoOrg = () => {
	const user = useUser();
	return (
		<div className="flex flex-col items-center justify-center w-full min-h-[70vh]">
			<h1 className="text-xl font-bold text-center">No Organization Found</h1>
			<p className="text-sm max-w-xs mt-1 text-slate-600 text-center">
				You are not part of any organization. You can create one or join one.
			</p>
		</div>
	);
};

export default NoOrg;
