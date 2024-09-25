/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  unstable_allowDynamic: [
    "./auth.config.jsx",
    "./lib/models/User/User.jsx",
    "./node_modules/bcryptjs/dist/bcrypt.js",
    "./node_modules/mongoose/dist/browser.umd.js",
    "./lib/mongoose.jsx",
    "./middleware.jsx"
  ],
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
