import type { NextConfig } from "next";
const imageHosts = [
  "res-ins.pumpsoul.com",
  "res-back.pumpsoul.com",
  "recentlyfolowed.com ",
];
// import SitemapPlugin from "./SitemapPlugin";

const nextConfig: NextConfig = () => {
  return {
    output: "standalone",
    env: {
      NEXT_PUBLIC_NEXT_APP_WEB_HOST: process.env.NEXT_PUBLIC_NEXT_APP_WEB_HOST,
      NEXT_PUBLIC_NEXT_APP_API_HOST: process.env.NEXT_PUBLIC_NEXT_APP_API_HOST,
      NEXT_PUBLIC_NEXT_APP_BLOG_API_HOST:
        process.env.NEXT_PUBLIC_NEXT_APP_BLOG_API_HOST,
      NEXT_PUBLIC_NEXT_APP_ENV: process.env.NEXT_PUBLIC_NEXT_APP_ENV,
      NEXT_PUBLIC_NEXT_APP_TENANTID: process.env.NEXT_PUBLIC_NEXT_APP_TENANTID,
      NEXT_PUBLIC_STRIPE_API_TOKEN: process.env.NEXT_PUBLIC_STRIPE_API_TOKEN,
      NEXT_PUBLIC_STRIPE_PUBLICK_KEY:
        process.env.NEXT_PUBLIC_STRIPE_PUBLICK_KEY,
    },
    async rewrites() {
      return [
        {
          source: "/fb-auth/:path*",
          destination: "https://recentlyfolowed.firebaseapp.com/:path*", // 将所有的next-api请求重写到api文件夹
        },
        {
          source: "/server-sitemap.xml",
          destination: "/api/server-sitemap.xml", // 将所有的next-api请求重写到api文件夹
        },
      ];
    },
    images: {
      remotePatterns: imageHosts.map((item) => {
        return {
          hostname: item,
        };
      }),
      deviceSizes: [100, 200, 500, 800, 1000],
    },
    webpack: (config: any) => {
      // config.plugins.push(new SitemapPlugin());
      return config;
    },
  };
};

module.exports = nextConfig;
