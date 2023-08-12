import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { PROJECT_ROOT } from 'lib/env.js'
import Decoder from 'lib/decoder.js'
import Parser from 'lib/parser.js'
import { ensureDirSync } from 'fs-extra'
// Get target from cli parameter
const [target = 'RV64G'] = process.argv.slice(2)
// Collect all related data
const raw = (await import(resolve(PROJECT_ROOT, 'targets', `${target}.js`))).default
// Secure build path
const buildPath = resolve(PROJECT_ROOT, 'build', target)
ensureDirSync(buildPath)
// Save raw.json
writeFileSync(
	resolve(buildPath, 'raw.json'),
	JSON.stringify(raw, null, 4)
)
// Create decode strategy
writeFileSync(
	resolve(buildPath, 'decoder.js'),
	new Decoder(
		Object.fromEntries(
			Object
				.entries(raw)
				.map(([id, { mask }]) => [id, mask])
		)
	).js
)
// Create parser library
function generateParserBin([op, { args }]) {
	const segments = Object.entries(args).sort((a, b) => a[0] > b[0])
	const scripts = segments.map(
		([param, range]) => `'${param}': ${new Parser(range, op, param).js}`)
	return `'${op}': code => ({\n\t\t${scripts.join(',\n\t\t')}\n\t})`
}

const parserScript = Object
	.entries(raw)
	.map(generateParserBin)
	.join(',\n\t')

writeFileSync(
	resolve(buildPath, 'parser.js'),
	`export default {\n\t${parserScript}\n}`.trim()
)
