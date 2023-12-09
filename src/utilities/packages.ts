const packages = [
	{
		title: "Pach Phoron",
		description: "This is the basic and our most popular plan.",
		price: 1000,
		discountPrice: 0,
		isActive: false,
	},
	{
		title: "Elachi",
		description:
			"Best for growing restaurants. As well as known as business plan.",
		price: 1000,
		discountPrice: 0,
		isActive: false,
	},
	{
		title: "Daruchini",
		description:
			"Best for large restaurants, which is known as Enterprise plan.",
		price: 1000,
		discountPrice: 0,
		isActive: true,
	},
];

const features = [
	{
		label: "Dashboard",
		children: [
			{
				label: "Reservation Analytics",
				access: [true, true, true],
			},
			{
				label: "Customised Shortcuts",
				access: [false, false, false],
			},
		],
	},
	{
		label: "Restaurant",
		children: [
			{
				label: "Customised Profile",
				access: [true, true, true],
			},
			{
				label: "Smart Menu System",
				access: [false, true, true],
			},
			{
				label: "Weekly Opening Schedules",
				access: [false, false, true],
			},
		],
	},
	{
		label: "Marketing",
		children: [
			{
				label: "SMS Marketing",
				access: [false, false, true],
			},
			{
				label: "Email Marketing",
				access: [false, true, true],
			},
			{
				label: "In-App Marketing",
				access: [false, false, true],
			},
		],
	},
	{
		label: "Reservation",
		children: [
			{
				label: "Real-time Reservation System",
				access: [true, true, true],
			},
			{
				label: "In-App Notification",
				access: [true, true, true],
			},
			{
				label: "Timeline View",
				access: [false, false, true],
			},
			{
				label: "Floor Management",
				access: [false, false, false],
			},
		],
	},
];

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	list: packages,
	features,
};
