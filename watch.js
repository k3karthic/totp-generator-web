/*
 * Imports
 */

const path = require('path')
const fs = require('fs')

const crypto = require('crypto')

const jsdom = require('jsdom')
const { JSDOM } = jsdom

/*
 * Data
 */

const srcFile = path.join(__dirname, 'src', 'index.html')
const dstFile = path.join(__dirname, 'build', 'index.html')

/*
 * Functions
 */

const calcHashes = function (arr) {
    const hashes = []

    for (const x of arr) {
        const str = x.innerHTML

        const hash = crypto.createHash('sha256')
        hash.update(str)

        hashes.push(`'sha256-${hash.digest('base64')}'`)
    }

    return hashes
}

/*
 * Main
 */

fs.watch(srcFile, (event, filename) => {
    if (!filename) {
        return
    }

    // Read and parse src/index.html
    const src = fs.readFileSync(srcFile, 'utf-8')
    const dom = new JSDOM(src)

    // Calculate sha256 hashes of script tags
    const scriptHashes = calcHashes(
        dom.window.document.querySelectorAll('script')
    )

    // Calculate sha256 hashes of style tags
    const styleHashes = calcHashes(
        dom.window.document.querySelectorAll('style')
    )

    // Update CSP
    const csp = dom.window.document.querySelector(
        'meta[http-equiv="Content-Security-Policy"]'
    )

    let content = csp.getAttribute('content')
    content = content.replace(
        "script-src 'unsafe-inline'",
        `script-src ${scriptHashes.join(' ')}`
    )
    content = content.replace(
        "style-src 'unsafe-inline'",
        `style-src ${styleHashes.join(' ')}`
    )

    csp.setAttribute('content', content)

    // Write to site/index.html
    fs.writeFileSync(dstFile, dom.serialize(), 'utf-8')
    console.log('updated index.html')
})
