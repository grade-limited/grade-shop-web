const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "api.grade.tamslab.site",
      "api.shop.gradebd.com",
      "localhost", // LOCALHOST
      "127.0.0.1", // LOCALHOST
    ],
  },
  i18n,
};

module.exports = nextConfig;
