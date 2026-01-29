import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/demos/static-variants-using-rewrites",
          missing: [{ type: "cookie", key: "isLoggedIn" }],
          destination: "/demos/static-variants-using-rewrites/sign-in",
        },
      ],
    };
  },
};

export default nextConfig;
