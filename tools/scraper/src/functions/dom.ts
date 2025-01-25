import jsdom from 'jsdom'

export const createDocument = (html: string): Document => {
    const dom = new jsdom.JSDOM(html)

    return dom.window.document
}
