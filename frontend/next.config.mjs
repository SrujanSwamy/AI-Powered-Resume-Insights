/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["canvas"],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8001',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;