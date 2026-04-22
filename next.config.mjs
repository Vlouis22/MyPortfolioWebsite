import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.200"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
    }

    return config;
  },
};

export default nextConfig;
