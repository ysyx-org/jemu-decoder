export default {
	mask: '-----------------110-----0000011',
	args: {
		imm: ['S32', '31:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	exec: {
		$: 'rd = zext([rs1 + sext(imm, 12)], 32)'
	},
	meta: {
		encoding: 'I',
		importance: NaN
	}
}
