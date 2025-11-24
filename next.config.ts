/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["is1-ssl.mzstatic.com"], // tambahkan domain iTunes
  },
};

module.exports = nextConfig;
