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
writeFileSync(
	resolve(buildPath, 'parser.js'),
	`export default {\n\t${
		Object
			.entries(raw)
			.map(([id, { args }]) => `'${id}': code => ({\n\t\t${
				Object
					.entries(args)
					.map(([name, range]) => `${/(^\d)|[.-]/gi.test(name) ? `'${name}'` : name}: ${new Parser(range).js}`)
					.join(',\n\t\t')
			}\n\t})`)
			.join(',\n\t')
	}\n}`.trim()
)
// Make docs
let x = {
	['hello'](a) { return a }
}

