import { normalizeURL, getURLsFromHTML } from "./crawl";
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

test('getURLsFromHTML relative', () => {
	const html = `<a href="/git/hub"> github </a>`
	const base = `https://google.com`
	const actual = getURLsFromHTML(html, base)
	const expected = [`https://google.com/git/hub`]
	expect(actual).toEqual(expected)
})

test('getURLsFromHTML abs', () => {
	const html = `<a href="https://github.com">github </a>`
	const base = `https://google.com`
	const actual = getURLsFromHTML(html, base)
	const expected = [`https://github.com/`]
	expect(actual).toEqual(expected)
})

test('getURLsFromHTML abs2', () => {
	const html = `<a href="https://github.com">github </a><a href="https://leetcode.com">leetcode </a>`
	const base = `https://google.com`
	const actual = getURLsFromHTML(html, base)
	const expected = [`https://github.com/`, `https://leetcode.com/`]
	expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
	const html = `<a href="https://github.com">github </a><a href="/git/hub"> github </a>`
	const base = `https://google.com`
	const actual = getURLsFromHTML(html, base)
	const expected = [`https://github.com/`, `https://google.com/git/hub`]
	expect(actual).toEqual(expected)
})



