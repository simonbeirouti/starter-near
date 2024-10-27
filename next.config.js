 /** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'app.localhost:3000',
            },
          ],
          destination: '/app/:path*',
        },
      ],
    }
  },
}

module.exports = nextConfig