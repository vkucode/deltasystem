/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["193.203.169.241"],
    unoptimized: true,
  },
};
module.exports = nextConfig;
