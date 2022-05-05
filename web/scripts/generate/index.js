import { WEB_ROOT, BUILD_PATH } from '../../env.js'
import { dirname, resolve } from 'path'
import { ensureDirSync } from 'fs-extra'
import { readFileSync, writeFileSync } from 'fs'
import { marked } from 'marked'
// Path to store auto-generated files
const VAR_PATH = resolve(WEB_ROOT, 'var'), PWD = dirname(import.meta.url.replace(/^file:/gi, ''))
// Ensure the existence of the directory
ensureDirSync(VAR_PATH)
// Load decoder build results
const raw = JSON.parse(readFileSync(resolve(BUILD_PATH, 'raw.json')))
// Generate router index
writeFileSync(
	resolve(VAR_PATH, 'router.index.js'),
	`export default ${
		JSON.stringify(
			Object.fromEntries(
				Object
					.entries(raw)
					.map(([key, { doc = {} }]) => [key, Object.keys(doc)])
			),
			null,
			'\t'
		)
	}`
)
// Generate search index
writeFileSync(
	resolve(VAR_PATH, 'search.index.js'),
	`export default ${
		JSON.stringify(
			Object.fromEntries(
				Object
					.entries(raw)
					.map(([key, { meta: { type, encoding } = {} }]) => [key, { type, encoding }])
			),
			null,
			'\t'
		)
	}`
)
// Generate sidebar index
writeFileSync(
	resolve(VAR_PATH, 'sidebar.index.js'),
	`export default ${
		JSON.stringify(
			Object.entries(
				Object
					.entries(raw)
					.reduce(
						(result, [inst, { meta: { type, encoding } }]) => {
							const dsc = { title: inst, url: `/${inst}`, suffix: encoding }
							if (!(type in result)) result[type] = []
							result[type].push(dsc)
							return result
						},
						{}
					)
			)
			.sort(([a], [b]) => a < b)
			.map(([type, items]) => ({
				title: type,
				items: items.sort((a, b) => a.title < b.title)
			})),
			null,
			'\t'
		)
	}`
)
// Load parser
const parser = (await import(resolve(BUILD_PATH, 'parser.js'))).default
// Generate instruction detail view
const instVuePath = resolve(VAR_PATH, 'inst.vue')
ensureDirSync(instVuePath)
for (const inst in raw) {
	const { mask, args, exec, meta, doc } = raw[inst]
	for (const locale in doc) {
		writeFileSync(
			resolve(instVuePath, `${inst}.${locale}.vue`),
			readFileSync(resolve(PWD, 'inst.template.vue'))
				.toString()
				.split('\n')
				.filter(str => !str.includes('$PSEUDO'))
				.join('\n')
				.replace(
					'$DOC',
					marked
						.parse(doc[locale])
						.split('\n')
						.map(str => str.trim())
						.filter(str => !!str)
						.join('\n\t\t\t')
				)
				.replace('$INST', JSON.stringify(inst))
				.replace('$MASK', JSON.stringify(mask))
				.replace('$ARGS', JSON.stringify(args))
				.replace('$EXEC', JSON.stringify(exec))
				.replace('$META', JSON.stringify(meta))
				.replace('$PARSE', parser[inst].toString())
		)
	}
}
