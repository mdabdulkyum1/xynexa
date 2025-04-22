/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com", "example.com"],
    remotePatterns: [
          { protocol: "https", hostname: "i.ibb.co" },
          { protocol: "https", hostname: "*" },
        ],
  },
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
};

export default nextConfig;
