/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/book',
        destination: '/contact?booking=true#booking-form',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
