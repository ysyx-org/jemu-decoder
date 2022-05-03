import { readFileSync } from 'fs'
import { PROJECT_ROOT } from 'lib/env.js'
import { base, parseFlash } from './index.js'
import { resolve } from 'path'
console.log('>>> testing decoder')
// Load test builds
const decode = (await import(resolve(base, 'decoder.js'))).default
const parser = (await import(resolve(base, 'parser.js'))).default
// Load test files
const flash = parseFlash(
	readFileSync(resolve(PROJECT_ROOT, 'test', 'hello.flash'))
)
console.log(flash)
flash.forEach(({ code, inst, info }) => {
	const result = decode(code)
	console.log(
		code.toString(16).padStart(8, '0'),
		inst.padEnd(8, ' '),
		result.padEnd(8, ' '),
		inst === result ? 'pass' : 'FAILED !!!!!!!!!!'
	)
	console.log(
		Object
			.fromEntries(parser[result](code))
			.map(([key, val]) => `${key} = ${val}`)
			.join('\t'),
		info
	)
})
