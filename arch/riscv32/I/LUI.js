export default {
	mask: '-------------------------0110111',
	args: {
		imm: ['S32', '31:12'],
		rd: ['11:7']
	},
	exec: {
		$: 'rd = sext(imm << 12, 32)'
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
