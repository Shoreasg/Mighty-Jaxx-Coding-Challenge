/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'mightymeta.world', 
      },
      {
        protocol: 'https',
        hostname: 'soullesscitadel.com'
      }
    ]
  }
}

module.exports = nextConfig
