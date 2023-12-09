/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#eb2127",
					light: "#f16468",
					dark: "#8d1417",
					50: "#fde9e9",
					100: "#fbd3d4",
					200: "#f9bcbe",
					300: "#f7a6a9",
					400: "#f59093",
					500: "#ef4d52",
					600: "#d41e23",
					700: "#a5171b",
					800: "#761114",
					900: "#460a0c",
				},
			},
		},
		screens: {
			xs: "375px",
			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
	important: true,
};
