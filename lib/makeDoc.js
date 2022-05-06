const Rx = {
	get escape() { return /^@(\w+)<(.*)>$/i }
}

function handleEscape(line, meta) {
	const [key, val] = line.match(Rx.escape)
	meta[key] = (
		{
			locale: str => !str.trim() || /(^|\s)\*/.test(str)
				? undefined
				: str.trim().split(/\s+/g)
		}[key] || (s => s)
	)(val)
}

function pushLine(line, doc, wildcard, locale) {
	if (!Array.isArray(locale)) {
		// wildcard push
		wildcard.push(line)
		for (const l in doc) {
			doc[l].push(line)
		}
	} else {
		// push to specified locale(s)
		for (const l of locale) {
			// Initialize unknown locale entry
			if (!(l in doc)) doc[l] = [...wildcard]
			doc[l].push(line)
		}
	}
}

export default function makeDoc(md) {
	const
		doc = { en: [] },
		wildcard = [],
		meta = { locale: undefined, title: '' }
	for (const line of md.split('\n')) {
		if (Rx.escape.test(line)) {
			handleEscape(line, meta)
		} else {
			pushLine(line, doc, wildcard, meta.locale)
		}
	}
	// Squash array of lines into a single string
	for (const locale in doc) doc[locale] = doc[locale].join('\n')
	// Remove locale from meta
	delete meta.locale
	return [doc, meta]
}
