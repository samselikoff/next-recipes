import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/demos/static-page-variants",
          has: [{ type: "cookie", key: "isLoggedIn" }],
          destination: "/demos/static-page-variants/home",
        },
      ],
    };
  },
};

export default nextConfig;
