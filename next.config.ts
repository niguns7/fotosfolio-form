import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-np1.datahub.com.np',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.fotosfolio.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bb.fotosfolio.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dev.fotosfolio.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.eu-central-003.backblazeb2.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
