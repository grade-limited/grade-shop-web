import { Html, Head, Main, NextScript } from "next/document";
import i18nextConfig from "../../next-i18next.config";

export default function Document(props: any) {
	const currentLocale =
		props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
	return (
		<Html lang={currentLocale}>
			<Head>
				<link
					rel="icon"
					href="/favicon.svg"
				/>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				/>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&family=Noto+Sans+Bengali:wght@100;200;300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body suppressHydrationWarning>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
