import { join } from 'node:path'

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        outputFileTracingRoot: join(import.meta.dirname, '../..'),
    },
    output: 'standalone',
}

export default nextConfig
