import { CHARACTERS_SCRAPING_META } from '@tekken-space/types'
import { scrape } from './scraper'

try {
    console.log('Starting scraper...')

    for (const characterScrapingMeta of CHARACTERS_SCRAPING_META) {
        console.log(`Scraping: ${characterScrapingMeta.id}`)
        await scrape(characterScrapingMeta)
        console.log(`Finished scraping: ${characterScrapingMeta.id}`)
    }

    console.log('Finished scraping.')
} catch (error: unknown) {
    console.error('Failed to scrape with error:', error)
}
