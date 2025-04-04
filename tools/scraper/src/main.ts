import { CHARACTERS_SCRAPING_META } from '@tekken-space/types'
import { downloadMoveList } from './core/downloader'
import { overrideMoveList } from './core/overrider'
import { linkMoveList } from './core/linker'
import { harmonizeMoveList } from './core/harmonizer'

try {
    for (const characterScrapingMeta of CHARACTERS_SCRAPING_META) {
        console.log(
            `Downloading original move list for ${characterScrapingMeta.name}...`,
        )
        await downloadMoveList(characterScrapingMeta)
        console.log(`Finished downloading for ${characterScrapingMeta.name}.`)

        console.log(`Applying overrides for ${characterScrapingMeta.name}...`)
        await overrideMoveList(characterScrapingMeta)
        console.log(
            `Finished applying overrides for ${characterScrapingMeta.name}.`,
        )

        console.log(`Linking move list for ${characterScrapingMeta.name}...`)
        await linkMoveList(characterScrapingMeta)
        console.log(
            `Finished linking move list for ${characterScrapingMeta.name}.`,
        )

        console.log(
            `Harmonizing move list for ${characterScrapingMeta.name}...`,
        )
        await harmonizeMoveList(characterScrapingMeta)
        console.log(
            `Finished harmonizing move list for ${characterScrapingMeta.name}.`,
        )
    }

    console.log('Finished.')
} catch (error: unknown) {
    console.error('Failed to download with error:', error)
}
