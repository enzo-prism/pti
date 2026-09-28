/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Redirects (www → apex and legacy paths) live in vercel.json, which Vercel
  // applies before requests reach Next.js.
  async rewrites() {
    return [
      {
        source: "/:file(google[a-zA-Z0-9]+\\.html)",
        destination: "/api/google-site-verification?file=:file",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        // PTI's Cloudinary account only, so the optimizer cannot be used to
        // proxy arbitrary Cloudinary images.
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dhqpqfw6w/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BUILD_TIMESTAMP: Date.now().toString(),
    ...(process.env.VERCEL_ENV
      ? { NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV }
      : {}),
  },
};

export default nextConfig;
