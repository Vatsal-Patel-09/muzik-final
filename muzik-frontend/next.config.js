/** @type {import('next').NextConfig} */
const nextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    domains: ['images.unsplash.com',"www.google.com", "i.postimg.cc"],
  },
};

module.exports = nextConfig;
