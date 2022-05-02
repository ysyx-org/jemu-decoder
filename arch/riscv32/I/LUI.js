export default {
	mask: '-------------------------0110111',
	args: {
		imm: ['31:12'],
		rd: ['11:7']
	},
	sext: true,
	exec: {
		$: 'rd = sext(imm << 12, 32)'
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
