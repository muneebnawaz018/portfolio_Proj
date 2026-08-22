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
    // Every <Image> emits one candidate per configured width into its srcset,
    // and the page carries ~20 of them. The stock lists are 16 widths wide and
    // run to 3840px, which nothing here renders: the largest slot on the site
    // is the 896px project modal (1792px at 2x). Trimming to the widths the
    // layout actually asks for cut the served HTML by ~35KB.
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [256, 384],
    // No remotePatterns: every image the site renders now ships from `public/`.
    // The profile art used to come from Cloudinary, which meant the LCP image
    // could not be served until the optimizer had fetched it cross-origin.
    //
    // Serving locally costs one thing: the optimizer used to inherit
    // Cloudinary's year-long Cache-Control, and for a local file it falls back
    // to minimumCacheTTL, which defaults to 60 seconds. An hour with
    // background revalidation is the same bargain netlify.toml already strikes
    // for /projects/* — these filenames are stable and get replaced in place,
    // so they must not be cached as immutable.
    minimumCacheTTL: 3600,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // next/dist/client/app-globals.js requires @next/polyfill-module on every
      // page, shimming Object.hasOwn, Array.prototype.flat/flatMap,
      // Object.fromEntries, String.prototype.trimStart/trimEnd and
      // Promise.prototype.finally. Every browser in the package.json
      // browserslist (Chrome 93 / Firefox 92 / Safari 15.4, all 2021 or older)
      // ships those natively. browserslist alone does not drop it — Next
      // requires the module unconditionally — and IgnorePlugin makes the
      // require throw at runtime. `alias: false` resolves it to an empty
      // module instead, which is what the caller already expects back.
      config.resolve.alias = {
        ...config.resolve.alias,
        "../build/polyfills/polyfill-module": false,
      }
    }
    return config
  },
}

export default nextConfig
