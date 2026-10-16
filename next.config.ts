import type { NextConfig } from "next";

// Next.js 16 no longer runs ESLint during `next build` (and removed the
// `eslint` config key), so linting is run separately via `pnpm lint`.
const FRAME_ANCESTORS =
  "frame-ancestors 'self' capacitor://localhost https://localhost https://web.bwalletx.com https://desktop.bwalletx.com";

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "Content-Security-Policy", value: FRAME_ANCESTORS }] }];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
