/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
   remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/images/products/**",
      },
    ], 
    domains: ["neska-store.liara.run"],
  },
};

export default nextConfig;
