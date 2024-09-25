/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, "bcryptjs", "mongoose"];
    return config;
  }
};

export default nextConfig;
