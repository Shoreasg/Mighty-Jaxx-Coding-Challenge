/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'mightymeta.world'
      }
    ]
  }
}

module.exports = nextConfig
