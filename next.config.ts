import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/demos/static-page-variants/dashboard",
          destination: "/404",
        },
        {
          source: "/demos/static-page-variants",
          has: [{ type: "cookie", key: "isLoggedIn" }],
          destination: "/demos/static-page-variants/dashboard",
        },
      ],
    };
  },

  /*
    Handle the case where the optimistic check is wrong.
  */
  async headers() {
    return [
      {
        source: "/demos/static-page-variants",
        has: [{ type: "query", key: "stale" }],
        headers: [
          {
            key: "Set-Cookie",
            value: "isLoggedIn=; Path=/; Max-Age=0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
