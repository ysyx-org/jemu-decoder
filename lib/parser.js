export default class Parser {
	signed = false
	width = 32
	set type(type) {
		// Create mapping strategy
		this.signed = /^(s|signed)/i.test(type)
		this.width = parseInt(type.replace(/^[a-z]*/gi, ''))
	}
	/** @type {Number[]} */
	range = []
	get length() { return this.range.length }
	constructor(ranges) {
		// Flatten range table
		ranges.forEach(expr /* ['start:end' | 'start' | 'S32' | 'U32' | 'S64' | 'U64'] */ => {
			// detect type declaration
			if (/^[SU](32|64)$/.test(expr)) return this.type = expr
			// otherwise, treat as range declaration
			const
				[l, r = l] = expr.split(':').map(s => parseInt(s)),
				step = l <= r ? 1 : -1
			let i = l
			// eslint-disable-next-line no-constant-condition
			while (true) {
				this.range.push(i)
				if (i === r) break
				i += step
			}
		})
	}

	get shift() {
		return this.range.map((src, i) => {
			const dst = this.range.length - (i + 1)
			return dst - src
		})
	}

	get operations() {
		const { shift } = this
		return shift
			// make unique
			.filter((val, i, self) => self.indexOf(val) === i)
			// sort
			.sort()
			// generate mask
			.map(s => [s, shift.map(d => d === s ? 1 : 0).join('')])
	}

	get js() {
		const expr = this.operations.map(([s, mask]) => {
			switch (Math.sign(s)) {
				case 1:
					return `code << ${s} & 0b${mask}`
				case -1:
					return `code >>> ${-s} & 0b${mask}`
				case 0:
				default:
					return `code & 0b${mask}`
			}
		})
		const result = expr.join(' | ') || 'undefined'
		if (this.signed) {
			const fill = this.width - this.length
			if (fill > 0) {
				// sign extension
				return `(${result}) << ${fill} >> ${fill}`
			} else {
				return result
			}
		} else {
			// convert to unsigned
			return `(${result}) >>> 0`
		}
	}
}
