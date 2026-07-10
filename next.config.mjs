/** @type {import('next').NextConfig} */
const nextConfig = {
  // `next dev` and `next build` share this directory, so a build run against a
  // live dev server wipes the chunks it is serving and hot reload dies. Set
  // NEXT_DIST_DIR to build somewhere else while dev keeps running. Never honour
  // it on Netlify: its Next runtime looks for `.next` and nothing else.
  distDir: process.env.NETLIFY ? ".next" : process.env.NEXT_DIST_DIR || ".next",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/dpwy3mjiz/**" },
    ],
  },
}

export default nextConfig
