export default {
	mask: '-----------------000-----0011011',
	args: {
		imm: ['S32', '31:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	exec: {
		$: 'rd = sext(rs1 + sext(imm[11:0], 12), 32)'
	},
	meta: {
		encoding: 'I',
		importance: NaN
	}
}
