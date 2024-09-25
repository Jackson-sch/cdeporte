/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  unstable_allowDynamic: [
    "./auth.config.jsx",
    "./lib/models/User/User.jsx",
    ".node_modules/mangosta/dist/browser"
  ]
  /* webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        dns: false,
        tls: false,
        fs: false,
        request: false,
      };
    }
    return config;
  }, */
};

export default nextConfig;
