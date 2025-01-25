import { describe, it } from 'node:test'
import assert from 'node:assert'
import type { ScrapedFrameData } from '@tekken-space/types'

import * as frames from './frames'

const sampleData: Record<string, ScrapedFrameData> = {
    '+10': {
        _raw: '',
        lower: '+10',
        properties: [],
    },
    '+14g': {
        _raw: '',
        lower: '+14',
        properties: ['g'],
    },
    '+29a (+20)': {
        _raw: '',
        lower: '+29',
        properties: ['a'],
        tech: '+20',
    },
    '-7~+9': {
        _raw: '',
        lower: '-7',
        properties: [],
        upper: '+9',
    },
    '-10': {
        _raw: '',
        lower: '-10',
        properties: [],
    },
    '10': {
        _raw: '',
        lower: '10',
        properties: [],
    },
    i10: {
        _raw: '',
        lower: 'i10',
        properties: [],
    },
    'i16~19': {
        _raw: '',
        lower: 'i16',
        properties: [],
        upper: '19',
    },
}

const testFrameData = (key: keyof typeof sampleData) =>
    it(`should parse ${key}`, () => {
        const actual = frames.parseFrameDataString(key)
        const expected = sampleData[key]!

        assert.equal(actual._raw, key)
        assert.equal(actual.lower, expected.lower)
        assert.equal(actual.upper, expected.upper)
        assert.equal(actual.tech, expected.tech)
        assert.deepStrictEqual(actual.properties, expected.properties)
    })

describe('functions/frames', () => {
    Object.keys(sampleData).forEach(testFrameData)
})
