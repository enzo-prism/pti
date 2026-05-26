/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.theforage.com",
      },
      {
        protocol: "https",
        hostname: "www.huntersure.com",
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
