/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['flowbite-admin-dashboard.vercel.app'],
  },
  async rewrites() {
    return [
      {
        source:'/login',
        destination:'/Auth/Login'
      },
      {
        source:'/signup',
        destination:'/Auth/SignUp'
      }
    ];
  },
};
