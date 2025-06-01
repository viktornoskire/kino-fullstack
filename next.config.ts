import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/',
      },

      {
        protocol: 'https',
        hostname: 'kino-fullstack-*.vercel.app',
        pathname: '/',
      },
    ],
  },
};

export default nextConfig;
