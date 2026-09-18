/** @type {import('next').NextConfig} */
const nextConfig = {
  // Load @react-pdf/renderer as an external Node package so its CJS build
  // (with renderToBuffer et al.) is used instead of the browser bundle.
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  },
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
