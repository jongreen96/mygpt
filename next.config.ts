import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'pub-c7c2ee979a9d48feae159993c18c10dc.r2.dev',
      },
    ],
  },
};

export default nextConfig;
