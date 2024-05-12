/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
      },

      webpack(config) {
        config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
        }
        return config
      },

      reactStrictMode: false,
   // pageExtensions: ["page.jsx", "api.ts", "page.ts"],


};

export default nextConfig;
