import { execSync } from 'child_process'
import { readdirSync, readFileSync } from 'fs'
import { dirname, relative, resolve } from 'path'
import yaml from 'yaml'
import lo from 'lodash'
import { PROJECT_ROOT } from './env.js'
import makeDoc from './makeDoc.js'
const PWD = dirname(import.meta.url.replace(/file:/g, ''))
const base = resolve(PWD, '../arch/')
function getContributors(path, files) {
	const
		fList = files.map(f => resolve(path, f)),
		out = execSync([
			'git shortlog -n -s --',
			...fList,
			'< /dev/tty'
		].join(' ')).toString()
	return out
		.split('\n')
		.map(line => line.replace(/^\s*\d+\s*/, '').trim())
		.filter(line => !!line)
}

export default function make(dir, attribute = {}) {
	dir = resolve(base, dir)
	const
		target = {},
		list = readdirSync(dir)
	for (const f of list) {
		const
			src = readFileSync(resolve(dir, f)).toString(),
			inst = f.replace(/\.(\w+)$/i, ''),
			suffix = f.slice(inst.length).toLowerCase(),
			dsc = inst in target
				? target[inst]
				: target[inst] = { meta: { ...attribute } }
		switch (suffix) {
			case '.yml':
			case '.yaml': {
				// Treat as structured data
				const { meta, args, ...yml } = yaml.parse(src)
				dsc.args = args
					? Object.fromEntries(
						Object
							.entries(args)
							.map(([key, arr]) => [
								key,
								[arr].flat(Infinity).map(e => e.toString())
							])
					)
					: {}
				Object.assign(dsc, yml)
				Object.assign(dsc.meta, meta)
				break
			}
			case '.md': {
				// Treat as description document
				const [doc, meta] = makeDoc(src)
				Object.assign(dsc, { doc })
				Object.assign(dsc.meta, meta)
				break
			}
			default:
				console.warn(`Unknown file type '${suffix}' (${resolve(dir, f)})`)
		}
	}
	for (const i in target) {
		const el = target[i]
		if (!el.mask || !el.args) {
			console.warn([
				`Instruction ${i} is missing specs, will be ignored.`,
				JSON.stringify(el, null, 4)
			].join('\n'))
			delete target[i]
		} else {
			for (const arg in el.args) {
				if (!Array.isArray(el.args[arg])) el.args[arg] = [el.args[arg]]
				if (arg.includes('\'')) {
					const [type, argName] = arg.split('\'')
					el.args[argName] = [
						type.toUpperCase(),
						...el.args[arg]
					]
					delete el.args[arg]
				}
			}
		}
		if (!el.doc) {
			console.warn(
				`Instruction ${i} is missing doc, proceeding anyway.`,
			)
		}
	}
	return target
}
