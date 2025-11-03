/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/blog/images/**",
      },
      {
        protocol: "https",
        hostname: "*.logicloom.de",
        pathname: "/uploads/blog/images/**",
      },
      {
        protocol: "https",
        hostname: "logicloom.app",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
