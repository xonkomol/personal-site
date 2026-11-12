import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Корень ведёт на русскую версию: /ru и /uz — две полноценные языковые ветки.
  async redirects() {
    return [{ source: "/", destination: "/ru", permanent: false }];
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
