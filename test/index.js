import { readFileSync } from 'fs'
import { PROJECT_ROOT } from 'lib/env.js'
import { resolve } from 'path'
// Declare params
const target = process.argv[3] || 'RV64G'
const base = resolve(PROJECT_ROOT, 'build', target)
function parseFlash(src) {
	return src
		.split('\n')
		.map(line => /^\s*(?<addr>[0-9a-f]+):\s*(?<code>[0-9a-f]+)\s*(?<inst>[a-z.]+)\s*(?<info>.*)\s*$/gi
			.exec(line)
			?.groups
		)
		.filter(el => typeof el === 'object')
}
// Prepare flash file
const flash = parseFlash(
	readFileSync(resolve(PROJECT_ROOT, 'test', 'hello.flash')).toString()
)
// Decoder test
console.log('>>> testing decoder')
// Load test builds
const decode = (await import(resolve(base, 'decoder.js'))).default
const parser = (await import(resolve(base, 'parser.js'))).default
// run test
flash.forEach(({ code, inst, info }) => {
	const result = decode(parseInt(code, 16)) || 'C'
	console.log(
		code.toString(16).padStart(8, '0'),
		inst.padEnd(8, ' '),
		result.padEnd(8, ' '),
		inst.toUpperCase() === result ? 'pass' : 'FAILED !!!!!!!!!!'
	)
	// Parse arguments
	const parsedArgs = result in parser ? parser[result](code) : null
	if (!parsedArgs) return
	console.log(
		Object
			.entries(parsedArgs)
			.map(([key, val]) => `${key} = ${val}`)
			.join(', '),
		info
	)
})
