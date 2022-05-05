export default {
	mask: '-------------------------0110111',
	args: {
		rd: ['11:7'],
		imm: ['S32', '31:12']
	},
	exec: {
		$: 'rd = sext(imm << 12, 32)'
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
