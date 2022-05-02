export default {
	mask: '-------------------------0010111',
	args: {
		imm: ['31:12'],
		rd: ['11:7']
	},
	sext: true,
	exec: {
		$: 'rd = pc + sext(imm[31:12], 32)'
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
