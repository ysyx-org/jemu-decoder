export default {
	mask: '-----------------111-----0010011',
	args: {
		imm: ['S32', '31:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	exec: {
		$: 'rd = rs1 & sext(imm[11:0], 12)'
	},
	meta: {
		encoding: 'I',
		importance: NaN
	}
}
