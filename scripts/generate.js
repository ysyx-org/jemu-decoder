import { readFileSync, writeFileSync } from 'fs'
import { ensureDirSync } from 'fs-extra'
import { dirname, resolve } from 'path'
import list from './list.js'

const
	Rx = {
		get title() {
			return /^RV(?<bw>\d\d)(?<cls>[A-Z])\|(?<inst>[A-Z.]+)/gi
		}
	},
	base = dirname(import.meta.url.replace(/^file:/gi, '')),
	template = readFileSync(resolve(base, 'template.txt')).toString()

function parseArgs(mask) {
	const args = {}, rg = (str, start) => `${31 - start}:${31 - (start + str.length - 1)}`
	// Immediate values
	mask = mask
		.replace(/([A-Z][a-z0-9]*)-*/g, (str, n, start) => {
			const name = n.toLowerCase()
			args[name] = [...args[name] || [], rg(str, start)]
			return ''.padEnd(str.length, '-')
		})
		.replace(/=+/g, (str, start) => {
			args.imm = [...args.imm || [], rg(str, start)]
			return ''.padEnd(str.length, '-')
		})
	return { mask, args }
}

function formatArgs(args) {
	return Object.entries(args).map(([key, val]) => {
		if (/[[\].]/.test(key)) key = `'${key}'`
		if (key === 'imm') val.unshift('S32')
		return `${key}: ${JSON.stringify(val)}`
	})
}

function getType(mask, args) {
	const LUT = {
		R: '*******----------***-----*******',
		X: '-----------------***-----*******',
		Y: '-----------------***-----*******',
	}
	for (const t in LUT) {
		const rx = new RegExp(LUT[t].replace(/\*/g, '[01]'))
		const immSegLength = imm => {
			if (!Array.isArray(imm)) return
			return imm.filter(range => /^\d+(:\d+)*$/gi.test(range)).length
		}
		if (rx.test(mask)) {
			switch (t) {
				case 'X':
					return {
						1: 'I',
						2: 'S',
						4: 'B',
					}[immSegLength(args.imm)] || '!'
				case 'Y':
					return {
						1: 'U',
						4: 'J',
					}[immSegLength(args.imm)] || '!'
				default:
					return t
			}
		}
	}
	return '?'
}

Object.entries(list).forEach(([title, [mask, exec]]) => {
	if (!Rx.title.test(title)) return
	const { groups: { bw, cls, inst } } = Rx.title.exec(title),
		path = resolve(base, `../arch/riscv${bw}/${cls}`),
		parsed = parseArgs(mask)
	ensureDirSync(dirname(path))
	writeFileSync(
		resolve(path, `${inst}.js`),
		template
			.replace(/\$MASK/g, parsed.mask)
			.replace(/\$EXEC/g, exec)
			.replace(/\$ARGS/g, formatArgs(parsed.args).join(',\n\t\t'))
			.replace(/\$TYPE/g, getType(parsed.mask, parsed.args))
	)
	writeFileSync(
		resolve(path, `${inst}.md`),
		[
			`<!-- Auto Generated For ${inst} (RV${bw}${cls}) -->`,
			readFileSync(resolve(base, 'template.md.txt'))
				.toString()
				.replace(/\$INST/g, inst)
				.replace(/\$TITLE/g, title.split('|')[0])
		].join('\n\n')
	)
})
