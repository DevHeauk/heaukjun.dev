import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // One canonical host: www sends you to the apex.
        source: "/:path*",
        has: [{ type: "host", value: "www.heaukjun.com" }],
        destination: "https://heaukjun.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
