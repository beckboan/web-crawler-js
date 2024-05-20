import { JSDOM } from 'jsdom'

function normalizeURL(url) {
	const urlOBJ = new URL(url)
	return `${urlOBJ.hostname}`
}

export { normalizeURL };

function getURLsFromHRML(html) {

}
