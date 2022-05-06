export default class Decoder {
	mask = 0xFFFFFFFF | 0
	get binMask() { return `0b${this.mask.toString(2).padStart(32, '0')}` }
	lut = {}
	get length() {
		return Object
			.values(this.lut)
			.reduce((sum, el) => sum + (el instanceof Decoder)
				? el.length
				: 1, 0
			)
	}
	constructor(list) {
		list = Object.entries(list)
		if (list.length <= 1) throw new Error
		// Find the mask for common digits
		list.forEach(([id, mask]) => {
			let instMask = 0, cnt = 0
			for (const digit of mask) {
				instMask = (instMask << 1) + (/[01]/.test(digit) ? 1 : 0) >>> 0
			}
			this.mask = (this.mask & instMask) >>> 0
		})
		// Check if the result is legal
		if (this.mask <= 0 || this.mask > 0xFFFFFFFF) throw new Error(`Mask out of range: ${this.mask}`)
		// Make the lut according to mask
		list.forEach(([id, mask]) => {
			const track = (
				(parseInt(mask.replace(/[^01]/g, '0'), 2) & this.mask) >>> 0
			).toString(2)
			if (track in this.lut) this.lut[track].push([id, mask])
			else this.lut[track] = [[id, mask]]
		})
		// Construct next level decoder
		for (const track in this.lut) {
			if (this.lut[track].length === 1) [[this.lut[track]]] = this.lut[track]
			else if (this.lut[track].length > 1) this.lut[track] = new Decoder(Object.fromEntries(this.lut[track]))
			else throw new Error
		}
	}

	get orderedLutList() {
		return Object.entries(this.lut).sort(([_1, a], [_2, b]) => {
			switch (((a instanceof Decoder) << 1) + (b instanceof Decoder)) {
				case 0b11:
					return a.length > b.length
				case 0b10:
					return true
				case 0b01:
					return false
				default:
					return true
			}
		})
	}

	get js() {
		return `
			export default function decode(code) { ${this.toJs()} }
		`.trim()
	}

	toJs() {
		// Create main logic
		return this.orderedLutList
			.map(([track, content]) => `
				if ((code & ${this.binMask}) === 0b${track}) { ${content instanceof Decoder ? content.toJs() : `return ${JSON.stringify(content)}`} }
			`.trim())
			.join(' else ')
	}
}
