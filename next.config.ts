import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  async rewrites() {
    return [
      {
        source: "/demos/static-page-variants",
        has: [{ type: "cookie", key: "isLoggedIn" }],
        destination: "/demos/static-page-variants/dashboard",
      },
      {
        source: "/demos/static-page-variants",
        missing: [{ type: "cookie", key: "isLoggedIn" }],
        destination: "/demos/static-page-variants/home",
      },
    ];
  },
};

export default nextConfig;
