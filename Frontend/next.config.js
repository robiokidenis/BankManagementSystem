/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
