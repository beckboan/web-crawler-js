import { JSDOM } from 'jsdom'

function normalizeURL(url) {
	const urlOBJ = new URL(url)
	let path = `${urlOBJ.hostname}${urlOBJ.pathname}`
	if (path.slice(-1) === `/`) {
		path = path.slice(0, -1)
	}
	return path
}


function getURLsFromHTML(htmlBody, baseURL) {
	const jsdom = new JSDOM(htmlBody)
	const anchorElements = jsdom.window.document.querySelectorAll('a')

	const urls = []

	for (const anchor of anchorElements) {
		if (anchor.hasAttribute('href')) {
			let href = anchor.getAttribute('href')

			try {
				href = new URL(href, baseURL).href
				urls.push(href)
			} catch (err) {
				console.log(`Failed to parse URL: ${err.message}`)
			}
		}
	}

	return urls

}

async function fetchHTML(URL) {
	try {
		const response = await fetch(URL, {
			method: "GET",
			mode: "cors"
		})

		if (response.status >= 400) {
			console.log(`Status Error: ${response.status}`)
			return null
		}

		if (!response.headers.get("content-type").includes("text/html")) {
			console.log(`Content Type is not "Text/HTML"`)
			return null
		}

		const text = await response.text()
		return text

	} catch (err) {
		console.log(err.message)
	}

}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {


	const base = new URL(baseURL)
	const current = new URL(currentURL)

	if (base.hostname !== current.hostname) {
		return pages
	}

	const currentNorm = normalizeURL(currentURL)

	if (pages[currentNorm] > 0) {
		pages[currentNorm]++;
		return pages
	}

	pages[currentNorm] = 1
	console.log(`Searching ${currentNorm} for links`)

	let htmlBody = ``

	try {
		htmlBody = await fetchHTML(currentURL)
	}
	catch (err) {
		console.log(`${err.message}`)
		return pages
	}

	const resultURLS = getURLsFromHTML(htmlBody, baseURL)
	for (const url of resultURLS) {
		pages = await crawlPage(baseURL, url, pages)
	}

	return pages
}

export { normalizeURL, getURLsFromHTML, crawlPage };
