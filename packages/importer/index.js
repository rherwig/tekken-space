import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import jsdom from 'jsdom';

const { JSDOM } = jsdom;

function htmlToJson(characterSlug) {
    const inputPath = fileURLToPath(
        new URL(`./resources/html/${characterSlug}.html`, import.meta.url),
    );
    const outputPath = fileURLToPath(
        new URL(`./resources/json/${characterSlug}.json`, import.meta.url),
    );
    const html = readFileSync(inputPath, 'utf8');

    const dom = new JSDOM(html);
    const table = dom.window.document.querySelector('table');
    const rows = Array.from(table.querySelectorAll('tbody tr'));

    const json = rows.map((row) => {
        const propertyColumns = Array.from(row.querySelectorAll('td'));

        const [
            commandColumn,
            hitLevelColumn,
            damageColumn,
            startupFrameColumn,
            blockFrameColumn,
            hitFrameColumn,
            counterFrameColumn,
            notesColumn,
        ] = propertyColumns;

        return {
            command: commandColumn.textContent,
            hitLevels: hitLevelColumn.textContent.split(','),
            damage: damageColumn.textContent.split(','),
            startupFrames: startupFrameColumn.textContent,
            blockFrames: blockFrameColumn.textContent,
            hitFrames: hitFrameColumn.textContent,
            counterFrames: counterFrameColumn.textContent,
            notes: notesColumn.textContent,
        };
    });

    writeFileSync(outputPath, JSON.stringify(json, null, 2));

    return json;
}

const characters = [
    'asuka',
    'azucena',
    'bryan',
    'claudio',
    'dragunov',
    'feng',
    'jack-8',
    'jin',
    'jun',
    'law',
    'leo',
    'nina',
    'paul',
    'raven',
    'reina',
    'steve',
    'victor',
    'yoshimitsu',
];

characters.forEach(htmlToJson);
