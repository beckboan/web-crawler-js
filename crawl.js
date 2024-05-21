import { JSDOM } from 'jsdom'

function normalizeURL(url) {
	const urlOBJ = new URL(url)
	return `${urlOBJ.hostname}`
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
				console.log(err.message)
			}
		}
	}

	return urls

}

async function crawlPage(baseUrl, currentUrl = baseUrl, pages = {}) {
	try {
		const response = await fetch(url, {
			method: "GET",
			mode: "cors"
		})

		if (response.status >= 400) {
			console.log(`Status Error: ${response.status}`)
			return
		}

		if (!response.headers.get("content-type").includes("text/html")) {
			console.log(`Content Type is not "Text/HTML"`)
			return
		}

		const text = await response.text()
		console.log(text)

	} catch (err) {
		console.log(err.message)
	}
}

export { normalizeURL, getURLsFromHTML, crawlPage };
