/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"] // <-- and this
  },
  
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true
    };
    return config;
  },
};

export default nextConfig;
