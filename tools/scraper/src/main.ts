import { CHARACTER_SLUGS } from '@tekken-space/types'
import { scrape } from './scraper'

try {
    console.log('Starting scraper...')

    for (const slug of CHARACTER_SLUGS) {
        console.log(`Scraping: ${slug}`)
        await scrape(slug)
        console.log(`Finished scraping: ${slug}`)
    }

    console.log('Finished scraping.')
} catch (error: unknown) {
    console.error('Failed to scrape with error:', error)
}
