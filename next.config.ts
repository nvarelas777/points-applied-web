import path from "node:path";
import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Next's built-in optimizer needs a Node/sharp server that doesn't
    // exist on Cloudflare Workers. Card art already comes pre-sized from
    // assets.pointsapplied.com and the logo is a small static PNG, so
    // nothing here actually needs on-the-fly resizing.
    unoptimized: true,
  },
};

export default nextConfig;

// Enables `wrangler`-backed bindings (env vars, etc.) in `next dev`.
initOpenNextCloudflareForDev();
