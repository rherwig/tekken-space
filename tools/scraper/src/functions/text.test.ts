import { describe, it } from 'node:test'
import assert from 'node:assert'

import * as text from './text'
import { createDocument } from '../utils'
import { loadLocalFile } from './files'

describe('functions/text', () => {
    it('should strip spaces', () => {
        const spaceCharacters = [' ', '\r', '\n', '\t', '\u00A0', '\u200B']

        assert.equal(text.stripSpaces(spaceCharacters.join('')), '')
    })

    it('should scrape notes', () => {
        const document = createDocument(
            loadLocalFile('./__fixtures__/notes.html', import.meta.url),
        )

        assert.deepEqual(text.scrapeNotes(document.documentElement), {
            notes: [
                'Combo from 1st hit with 1f delay',
                'Opponent recovers crouching on hit',
            ],
            specials: ['Balcony Break'],
        })
    })
})
