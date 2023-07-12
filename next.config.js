/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/news/1'
      }
    ]
  },
  env:{
    API_HOST: process.env.API_HOST
  }
}

module.exports = nextConfig
