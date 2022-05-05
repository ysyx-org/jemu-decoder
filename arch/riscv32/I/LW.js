export default {
	mask: '-----------------010-----0000011',
	args: {
		rs1: ['19:15'],
		rd: ['11:7'],
		imm: ['S32', '31:20']
	},
	exec: {
		$: 'rd = sext([rs1 + sext(imm, 12)], 32)'
	},
	meta: {
		encoding: 'I',
		importance: NaN
	}
}
