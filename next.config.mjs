/** @type {import('next').NextConfig} */

// next.config.mjs

import autoCert from 'anchor-pki/auto-cert/integrations/next';

const withAutoCert = autoCert({
  enabledEnv: 'development'
});


const nextConfig = {
  images: {
    remotePatterns: [{ hostname: `res.cloudinary.com` }]
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    NEXT_PUBLIC_CLOUDINARY_API_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
  }
};

export default withAutoCert(nextConfig);
