import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tekken.space'
    const lastModified = new Date()

    return [
        {
            changeFrequency: 'yearly',
            lastModified,
            priority: 1,
            url: baseUrl,
        },
        {
            changeFrequency: 'monthly',
            lastModified,
            priority: 0.8,
            url: `${baseUrl}/characters`,
        },
        {
            changeFrequency: 'monthly',
            lastModified,
            priority: 0.8,
            url: `${baseUrl}/share`,
        },
    ]
}
