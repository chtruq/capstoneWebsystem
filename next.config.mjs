/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "example.com",
      "www.apartments.com",
      "storage.googleapis.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Bỏ qua mọi lỗi ESLint khi build
  },
};

export default nextConfig;
