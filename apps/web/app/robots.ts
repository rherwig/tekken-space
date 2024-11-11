import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            allow: '/',
            disallow: '/api/',
            userAgent: '*',
        },
        sitemap: 'https://tekken.space/sitemap.xml',
    }
}
