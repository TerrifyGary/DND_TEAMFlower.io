/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: '/DND_TEAMFlower.io', // Set the base path for GitHub Pages
  assetPrefix: 'https://TerrifyGary.github.io/DND_TEAMFlower.io',
}

export default nextConfig
