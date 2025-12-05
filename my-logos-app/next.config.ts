import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    // 1. MUST BE 'export' for GitHub Pages to work
    output: 'export',
    
    // 2. Set the base path to your repository name
    basePath: isProd ? '/bible-study' : '',

    // 3. Optional, but helpful for static hosting
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
