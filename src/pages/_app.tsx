/* eslint-disable @next/next/next-script-for-ga */
import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import theme from "../styles/theme";
import { ConfigProvider } from "antd";
import Layout from "@/layouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

// import "@/config/translate";
import React from "react";
import { appWithTranslation, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function App({ Component, pageProps }: AppProps) {
	const query = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});

	const { t } = useTranslation("common");

	return (
		<>
			<NextNProgress
				color={"#eb2127"}
				height={5}
			/>
			<Head>
				<title>
					{t("META.TITLE").toString()} - Online Restaurant Reservation Platform
					Bangladesh
				</title>
				<meta
					name="description"
					content="Reserveit is the first online restaurant reservation platform based in Bangladesh. This is a simple and user-friendly application for selecting restaurants and booking seats for your next dine-out."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>

			<QueryClientProvider client={query}>
				<ThemeProvider theme={theme}>
					<ConfigProvider
						theme={{
							token: {
								colorPrimary: theme.palette.primary.main,
								borderRadius: 4,
								fontFamily: theme.typography.fontFamily,
							},
						}}
					>
						{/* <AuthProvider> */}
						<Layout>
							<Component {...pageProps} />
						</Layout>
						{/* </AuthProvider> */}
					</ConfigProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</>
	);
}

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale ?? "en", ["common"])),
			// Will be passed to the page component as props
		},
	};
}

export default appWithTranslation(App);
