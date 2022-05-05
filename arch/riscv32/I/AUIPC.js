export default {
	mask: '-------------------------0010111',
	args: {
		rd: ['11:7'],
		imm: ['S32', '31:12']
	},
	exec: {
		$: 'rd = pc + sext(imm[31:12], 32)'
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
