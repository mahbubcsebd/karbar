// const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // unoptimized: true,
        formats: ['image/avif', 'image/webp'],
        // domains: [
        //     'admin.daarib.com',
        //     'shop.uibarn.com',
        //     '127.0.0.1:8000',
        //     '192.168.0.124',
        //     '127.0.0.1',
        //     'admin.evascollection.shop',
        //     'img.freepik.com',
        // ],
        remotePatterns: [
            // {
            //     protocol: 'https',
            //     hostname: 'admin.daarib.com',
            // },
            {
                protocol: 'https',
                hostname: 'admin.evascollection.shop',
            },
            {
                protocol: 'https',
                hostname: 'demoadmin.karbar.shop',
            },
            {
                protocol: 'https',
                hostname: new URL(process.env.NEXT_PUBLIC_API_BASE_URL).hostname || 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
            },
            {
                protocol: 'https',
                hostname: '127.0.0.1:8000',
            },
            {
                protocol: 'http',
                hostname: '192.168.0.124',
            },
            {
                protocol: 'https',
                hostname: '127.0.0.1',
            },
            {
                protocol: 'https',
                hostname: 'www.facebook.com"',
            },
        ],
    },
    // experimental: {
    //     missingSuspenseWithCSRBailout: false,
    // },
};

export default nextConfig;