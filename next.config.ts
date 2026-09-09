import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /* The floating dev badge obscures the bottom-left of the page while
     reviewing layouts; it has no effect on production output. */
  devIndicators: false,

  images: {
    /**
     * Development placeholder photography is served from the Unsplash CDN.
     * REPLACE WITH OFFICIAL COLLEGE PHOTOGRAPHY: drop files into /public/images
     * and change the `src` values in data/images.ts to local paths. This
     * remotePatterns entry can then be removed entirely.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [64, 96, 128, 200, 256, 384],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
