import type { NextConfig } from "next";

// Next.js 16 no longer runs ESLint during `next build` (and removed the
// `eslint` config key), so linting is run separately via `pnpm lint`.
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
