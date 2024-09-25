/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  unstable_allowDynamic: [
    "./src/auth.config.jsx",
    "./src/lib/models/User/User.jsx",
    "./node_modules/bcryptjs/dist/bcrypt.js",
    "./node_modules/mongoose/dist/browser.umd.js",
    "./src/lib/mongoose.jsx",
    "./src/middleware.jsx",
  ],
  serverRuntimeConfig: {
    
  }
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
