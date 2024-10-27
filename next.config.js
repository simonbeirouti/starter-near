/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const isLocalhost = process.env.NODE_ENV === 'development';
    const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'app.localhost:3000';

    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: isLocalhost ? 'app.localhost:3000' : appDomain,
            },
          ],
          destination: '/app/:path*',
        },
      ],
    }
  },
}

module.exports = nextConfig