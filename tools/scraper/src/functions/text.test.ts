import { describe, it } from 'node:test'
import assert from 'node:assert'

import * as text from './text'

describe('functions/text', () => {
    it('should strip spaces', () => {
        const spaceCharacters = [' ', '\r', '\n', '\t', '\u00A0', '\u200B']

        assert.equal(text.stripSpaces(spaceCharacters.join('')), '')
    })
})
