import { normalizeURL } from "./crawl";
import { test, expect } from "@jest/globals";



test('normalizeURL no-slash', () => {
	const input = 'https://maps.google.com'
	const actual = normalizeURL(input)
	const expected = 'maps.google.com'
	expect(actual).toEqual(expected)
})

test('normalizeURL caps', () => {
	const input = 'https://MAPS.google.com'
	const actual = normalizeURL(input)
	const expected = 'maps.google.com'
	expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
	const input = 'https://maps.google.com/'
	const actual = normalizeURL(input)
	const expected = 'maps.google.com'
	expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
	const input = 'http://maps.google.com'
	const actual = normalizeURL(input)
	const expected = 'maps.google.com'
	expect(actual).toEqual(expected)
})

test('normalizeURL http-slash', () => {
	const input = 'http://maps.google.com/'
	const actual = normalizeURL(input)
	const expected = 'maps.google.com'
	expect(actual).toEqual(expected)
})

test('normalizeURL http-slash-caps', () => {
	const input = 'http://MAPS.Google.com/'
	const actual = normalizeURL(input)
	const expected = 'maps.google.com'
	expect(actual).toEqual(expected)
})

