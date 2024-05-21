import { crawlPage } from "./crawl.js"

function main() {
	const argv = process.argv

	if (argv.length !== 3) {
		console.log("Please use the program as follows: npm run start BASE_URL ")
		return
	}

	const baseURL = argv[2]

	console.log(`Starting cralwer at ${baseURL}`)

	crawlPage(baseURL)
}

main()
