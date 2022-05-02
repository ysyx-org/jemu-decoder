import { existsSync, readdirSync, readFileSync } from 'fs'
import { dirname, resolve } from 'path'
const PWD = dirname(import.meta.url.replace(/file:/g, ''))
const base = resolve(PWD, '../arch/')

function makeDoc(src) {
	const doc = { en: [] }
	let locale = 'en'
	// console.log(src)
	for (const line of src.split('\n')) {
		if (/^@locale\s[a-z-]*/ig.test(line)) {
			[locale] = line.match(/(?<=^@locale\s)[a-z-]*/gi)
			if (!(locale in doc)) doc[locale] = []
		} else {
			doc[locale].push(line)
		}
	}
	// Squash array of lines into paragraph
	for (const locale in doc) doc[locale] = doc[locale].join('\n')
	return doc
}

export async function makeTarget(path, attribute = {}) {
	path = resolve(base, path)
	const
		target = {},
		l = readdirSync(path),
		list = l.filter(el => /\.[mc]?js$/i.test(el)),
		docList = l.filter(el => !list.includes(el))
	for (const el of list) {
		const inst = el.replace(/\.js$/i, '')
		target[inst] = {
			...(await import(resolve(path, el))).default,
			...attribute,
			doc: (() => {
				const doc = `${inst}.md`
				if (docList.includes(doc)) return makeDoc(readFileSync(resolve(path, doc)).toString())
			})()
		}
	}
	return target
}
