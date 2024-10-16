/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './dist', // Changes the build output directory to `./dist/`.
    //basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    /* i18n: {
        locales: ['it-IT', 'en-EN'],
        defaultLocale: 'it-IT',
    } */
}

export default nextConfig