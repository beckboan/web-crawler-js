function printReport(pages) {
	console.log(`Starting report ...`)

	var items = Object.keys(pages).map(function(key) {
		return [key, pages[key]];
	})

	items.sort(function(first, second) {
		return second[1] - first[1];
	})

	for (const pair of items) {
		console.log(`Found ${pair[1]} internal links to ${pair[0]}`)
	}
}

export { printReport }
