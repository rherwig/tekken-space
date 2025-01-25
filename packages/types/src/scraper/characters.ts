import { createMovesListUrl } from './utils'

export interface CharacterScrapingMeta {
    id: string
    name: string
    movesListUrl: string
    scrapingPath: string
}

export const CHARACTERS_SCRAPING_META: CharacterScrapingMeta[] = [
    {
        id: 'alisa',
        movesListUrl: createMovesListUrl('Alisa'),
        name: 'Alisa',
        scrapingPath: '../scraper/.output/alisa.json',
    },
    {
        id: 'asuka',
        movesListUrl: createMovesListUrl('Asuka'),
        name: 'Asuka',
        scrapingPath: '../scraper/.output/asuka.json',
    },
    {
        id: 'azucena',
        movesListUrl: createMovesListUrl('Azucena'),
        name: 'Azucena',
        scrapingPath: '../scraper/.output/azucena.json',
    },
    {
        id: 'bryan',
        movesListUrl: createMovesListUrl('Bryan'),
        name: 'Bryan',
        scrapingPath: '../scraper/.output/bryan.json',
    },
    {
        id: 'clive',
        movesListUrl: createMovesListUrl('Clive'),
        name: 'Clive',
        scrapingPath: '../scraper/.output/clive.json',
    },
    {
        id: 'claudio',
        movesListUrl: createMovesListUrl('Claudio'),
        name: 'Claudio',
        scrapingPath: '../scraper/.output/claudio.json',
    },
    {
        id: 'devil-jin',
        movesListUrl: createMovesListUrl('Devil_Jin'),
        name: 'Devil Jin',
        scrapingPath: '../scraper/.output/devil-jin.json',
    },
    {
        id: 'dragunov',
        movesListUrl: createMovesListUrl('Dragunov'),
        name: 'Dragunov',
        scrapingPath: '../scraper/.output/dragunov.json',
    },
    {
        id: 'eddy',
        movesListUrl: createMovesListUrl('Eddy'),
        name: 'Eddy',
        scrapingPath: '../scraper/.output/eddy.json',
    },
    {
        id: 'feng',
        movesListUrl: createMovesListUrl('Feng'),
        name: 'Feng',
        scrapingPath: '../scraper/.output/feng.json',
    },
    {
        id: 'heihachi',
        movesListUrl: createMovesListUrl('Heihachi'),
        name: 'Heihachi',
        scrapingPath: '../scraper/.output/heihachi.json',
    },
    {
        id: 'hwoarang',
        movesListUrl: createMovesListUrl('Hwoarang'),
        name: 'Hwoarang',
        scrapingPath: '../scraper/.output/hwoarang.json',
    },
    {
        id: 'jack-8',
        movesListUrl: createMovesListUrl('Jack-8'),
        name: 'Jack-8',
        scrapingPath: '../scraper/.output/jack-8.json',
    },
    {
        id: 'jin',
        movesListUrl: createMovesListUrl('Jin'),
        name: 'Jin',
        scrapingPath: '../scraper/.output/jin.json',
    },
    {
        id: 'jun',
        movesListUrl: createMovesListUrl('Jun'),
        name: 'Jun',
        scrapingPath: '../scraper/.output/jun.json',
    },
    {
        id: 'kazuya',
        movesListUrl: createMovesListUrl('Kazuya'),
        name: 'Kazuya',
        scrapingPath: '../scraper/.output/kazuya.json',
    },
    {
        id: 'king',
        movesListUrl: createMovesListUrl('King'),
        name: 'King',
        scrapingPath: '../scraper/.output/king.json',
    },
    {
        id: 'kuma',
        movesListUrl: createMovesListUrl('Kuma'),
        name: 'Kuma',
        scrapingPath: '../scraper/.output/kuma.json',
    },
    {
        id: 'lars',
        movesListUrl: createMovesListUrl('Lars'),
        name: 'Lars',
        scrapingPath: '../scraper/.output/lars.json',
    },
    {
        id: 'law',
        movesListUrl: createMovesListUrl('Law'),
        name: 'Law',
        scrapingPath: '../scraper/.output/law.json',
    },
    {
        id: 'lee',
        movesListUrl: createMovesListUrl('Lee'),
        name: 'Lee',
        scrapingPath: '../scraper/.output/lee.json',
    },
    {
        id: 'leo',
        movesListUrl: createMovesListUrl('Leo'),
        name: 'Leo',
        scrapingPath: '../scraper/.output/leo.json',
    },
    {
        id: 'leroy',
        movesListUrl: createMovesListUrl('Leroy'),
        name: 'Leroy',
        scrapingPath: '../scraper/.output/leroy.json',
    },
    {
        id: 'lidia',
        movesListUrl: createMovesListUrl('Lidia'),
        name: 'Lidia',
        scrapingPath: '../scraper/.output/lidia.json',
    },
    {
        id: 'lili',
        movesListUrl: createMovesListUrl('Lili'),
        name: 'Lili',
        scrapingPath: '../scraper/.output/lili.json',
    },
    {
        id: 'nina',
        movesListUrl: createMovesListUrl('Nina'),
        name: 'Nina',
        scrapingPath: '../scraper/.output/nina.json',
    },
    {
        id: 'panda',
        movesListUrl: createMovesListUrl('Panda'),
        name: 'Panda',
        scrapingPath: '../scraper/.output/panda.json',
    },
    {
        id: 'paul',
        movesListUrl: createMovesListUrl('Paul'),
        name: 'Paul',
        scrapingPath: '../scraper/.output/paul.json',
    },
    {
        id: 'raven',
        movesListUrl: createMovesListUrl('Raven'),
        name: 'Raven',
        scrapingPath: '../scraper/.output/raven.json',
    },
    {
        id: 'reina',
        movesListUrl: createMovesListUrl('Reina'),
        name: 'Reina',
        scrapingPath: '../scraper/.output/reina.json',
    },
    {
        id: 'shaheen',
        movesListUrl: createMovesListUrl('Shaheen'),
        name: 'Shaheen',
        scrapingPath: '../scraper/.output/shaheen.json',
    },
    {
        id: 'steve',
        movesListUrl: createMovesListUrl('Steve'),
        name: 'Steve',
        scrapingPath: '../scraper/.output/steve.json',
    },
    {
        id: 'victor',
        movesListUrl: createMovesListUrl('Victor'),
        name: 'Victor',
        scrapingPath: '../scraper/.output/victor.json',
    },
    {
        id: 'xiaoyu',
        movesListUrl: createMovesListUrl('Xiaoyu'),
        name: 'Xiaoyu',
        scrapingPath: '../scraper/.output/xiaoyu.json',
    },
    {
        id: 'yoshimitsu',
        movesListUrl: createMovesListUrl('Yoshimitsu'),
        name: 'Yoshimitsu',
        scrapingPath: '../scraper/.output/yoshimitsu.json',
    },
    {
        id: 'zafina',
        movesListUrl: createMovesListUrl('Zafina'),
        name: 'Zafina',
        scrapingPath: '../scraper/.output/zafina.json',
    },
]
