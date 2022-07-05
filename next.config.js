/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['images.punkapi.com'],
  },
  env: {
    customKey: 'my-value',
  },
};

module.exports = nextConfig;
