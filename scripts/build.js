import { writeFileSync } from 'fs'
import { PROJECT_ROOT } from 'lib/env.js'
import Decoder from 'lib/decoder.js'
import { resolve } from 'path'
// Get target from cli parameter
const [target = 'RV64G'] = process.argv.slice(2)
// Collect all related data
const raw = (await import(resolve(PROJECT_ROOT, 'targets', `${target}.js`))).default
// Save raw.json
writeFileSync(
	resolve(PROJECT_ROOT, 'build', 'raw.json'),
	JSON.stringify(raw, null, 4)
)
// Create decode strategy
writeFileSync(
	resolve(PROJECT_ROOT, 'build', 'decoder.js'),
	new Decoder(
		Object.fromEntries(
			Object
				.entries(raw)
				.map(([id, { mask }]) => [id, mask])
		)
	).js
)
//

// Make docs

