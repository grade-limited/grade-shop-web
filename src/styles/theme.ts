import { createTheme } from "@mui/material";

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
		},
	},
	typography: {
		fontFamily: "Lexend, Noto Sans Bengali, sans-serif",
		// allVariants: {
		// 	color: "#000",
		// },
		button: {
			textTransform: "unset",
		},
	},
	palette: {
		primary: {
			main: "#eb2127",
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
			contrastText: "#fff",
		},
		secondary: {
			main: "#FBB03B",
			light: "#FCC062",
			dark: "#C98D2F",
			contrastText: "#fff",
		},
		success: {
			light: "#9bd99b",
			main: "#5ec25e",
			dark: "#36b336",
			contrastText: "#fff",
		},
		info: {
			main: "#ffffff",
			contrastText: "#401b60",
		},
		warning: {
			light: "#f3b999",
			main: "#ed9666",
			dark: "#e15000",
			contrastText: "#fff",
		},
		error: {
			light: "#d0736e",
			main: "#c1453d",
			dark: "#b1160d",
			contrastText: "#fff",
		},
		// background: {
		// 	default: "#161b22",
		// 	paper: "#30363d",
		// },
	},
});

export default theme;
