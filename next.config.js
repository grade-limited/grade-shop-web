const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: "",
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			"reserveitbd.com",
			"dev.next.reserveitbd.com", // PROXY API
			"api.reserveitbd.com",
			"apitest.reserveitbd.com", // API
			"localhost", // LOCALHOST
			"127.0.0.1", // LOCALHOST
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
				basePath: false,
			},
		];
	},
	i18n,
};

module.exports = nextConfig;
