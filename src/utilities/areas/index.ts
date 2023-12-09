const data: {
	[city: string]: {
		areas: {
			name: string;
			lat?: string;
			lng?: string;
		}[];
	};
} = {
	Dhaka: {
		areas: [
			{ name: "Dhanmondi", lat: "", lng: "" },
			{ name: "Lalmatia", lat: "", lng: "" },
			{ name: "Banani", lat: "", lng: "" },
			{ name: "Jigatola", lat: "", lng: "" },
			{ name: "Khilgaon", lat: "", lng: "" },
			{ name: "Gulshan", lat: "", lng: "" },
			{ name: "Mohammadpur", lat: "", lng: "" },
			{ name: "Banasree", lat: "", lng: "" },
		],
	},
	Chattogram: { areas: [{ name: "Dampara", lat: "", lng: "" }] },
	Mohammadpur: { areas: [{ name: "Mohammadpur", lat: "", lng: "" }] },
};

export const getAreas = () => {
	return data;
};
