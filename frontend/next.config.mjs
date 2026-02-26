/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["http://192.168.56.1:3000"],
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
