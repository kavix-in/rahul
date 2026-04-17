/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const iconPaths = ['/image.png']
    return iconPaths.map((source) => ({
      source,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, must-revalidate',
        },
      ],
    }))
  },
}

module.exports = nextConfig
