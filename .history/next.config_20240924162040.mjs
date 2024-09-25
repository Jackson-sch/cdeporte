/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"] // <-- and this
  },
  runtime: "edge",
  unstable_allowDynamic: [
    '/node_modules/mongoose/dist/browser.umd.js'
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
