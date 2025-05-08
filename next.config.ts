import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "github.com","res.cloudinary.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Adjust as needed
    },
  },
};

export default nextConfig;
