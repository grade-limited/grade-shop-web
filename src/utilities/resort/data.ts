export type IResortRoom = {
	name: string;
	description: string;
	profileImage: string;
	images: string[];
	price: number;
	bed: string;
	facilities: {
		name: string;
		description?: string;
	}[];
};

export type IResortData = {
	id: number | string;
	name: string;
	location: string;
	description: string;
	profileImage: string;
	coverImage: string;
	images: string[];
	restaurants: number[];
	faq?: {
		title: string;
		description: string;
	}[];
	rooms: IResortRoom[];
	facebookURL: string;
	instagramURL: string;
	twitterURL: string;
	youtubeURL: string;
	websiteURL: string;
	formURL?: string;
};

const resorts: {
	[id: number | string]: IResortData;
} = {
	1: {
		id: 1,
		name: "Sonargaon Royal Resort",
		location: "Khashnogor Dighirpar, Sonargaon, Narayangonj, Bangladesh",
		description: `We welcome you to our resort as you enlighten our abode with your warmth and smiley nature. We are truly grateful to you for your visit here and hope to have memorable moments throughout your visit.

        May I take this opportunity to reassure you that our resort\`s team will continue to not just provide the highest standards of service and comfort you have been so accustomed to, but exceeding your expectations will be our constant mission.`,
		profileImage: "/resort/logo.png",
		coverImage: "/resort/cover.jpg",
		images: [
			"/resort/cover.jpg",
			"/resort/semi-suite-1.jpg",
			"/resort/semi-suite-2.jpg",
			"/resort/semi-suite-3.jpg",
			"/resort/semi-suite-4.jpg",
			"/resort/semi-suite-5.jpg",
			"/resort/deluxe-twin-1.jpg",
			"/resort/deluxe-twin-2.jpg",
			"/resort/deluxe-twin-3.jpg",
			"/resort/deluxe-twin-4.jpg",
		],
		restaurants: [4, 7], // [129, 135],
		rooms: [
			{
				name: "Semi Suite",
				description: `This Semi-suite has a comfortable queen size or twin bed, a sitting area, a balcony, separate desk and bathroom with walk-in rain dance shower or a bath and shower and modern art and neutral colors.

                The rooms come with full amenities; Flat Screen TV, Wi-Fi, air-conditioning, electric kettle, terrace, drying rack for clothing, safe, minibar and complimentary coffee & tea facilities.
                
                Our Semi Suites. Tariff Tk 12,000++ ( ++=10% Service charge and 15% Vat).`,
				profileImage: "/dummy.jpg",
				images: [
					"/resort/semi-suite-1.jpg",
					"/resort/semi-suite-2.jpg",
					"/resort/semi-suite-3.jpg",
					"/resort/semi-suite-4.jpg",
					"/resort/semi-suite-5.jpg",
				],
				price: 12000,
				bed: "Two Double Bed",
				facilities: [
					{
						name: "Free WiFi",
					},
					{
						name: "AC",
					},
					{
						name: "Buffet Breakfast for Four",
						description: "Complimentary breakfast for four people",
					},
				],
			},
			{
				name: "Deluxe (Twin)",
				description: `Our Deluxe (Twin) rooms. Tariff Tk 7000++ ( ++=10% Service charge and 15% Vat). 

                This twin room has a balcony, electric kettle and flat-screen TV.
                
                The rooms come with full amenities; Wi-Fi, air-conditioning, clothes rack and complimentary coffee & tea facilities.`,
				profileImage: "/dummy.jpg",
				images: [
					"/resort/deluxe-twin-1.jpg",
					"/resort/deluxe-twin-2.jpg",
					"/resort/deluxe-twin-3.jpg",
					"/resort/deluxe-twin-4.jpg",
				],
				price: 7000,
				bed: "Two Twin Beds",
				facilities: [
					{
						name: "Free WiFi",
					},
					{
						name: "AC",
					},
					{
						name: "Buffet Breakfast for Four",
						description: "Complimentary breakfast for four people",
					},
				],
			},
		],
		faq: [
			{
				title: "What is the check-in and check-out time?",
				description: "Check-in time is 2:00 PM and check-out time is 12:00 PM.",
			},
		],
		facebookURL: "https://www.facebook.com",
		instagramURL: "https://www.instagram.com",
		twitterURL: "https://www.twitter.com",
		youtubeURL: "https://www.youtube.com",
		websiteURL: "https://www.sonargaonroyalresort.com/",
		formURL: "https://forms.gle/KUV29129NswUrRZx7",
	},
};

export default resorts;
