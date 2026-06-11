import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sajikan landing page statis (public/landing.html) di route "/"
  // tanpa mengubah desainnya sama sekali.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/landing.html",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
