/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    // Set the base path to the repository name for GitHub Pages hosting
    basePath: isProd ? '/bible-study' : '',
    // Use an 'out' directory for static export (required for GitHub Pages)
    output: 'export',
    // Optional: Turn off image optimization features that conflict with static export
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;