export default {
	mask: '-----------------100-----1100011',
	args: {
		imm: ['31:25', '11:7'],
		rs2: ['24:20'],
		rs1: ['19:15']
	},
	sext: true,
	exec: {
		$: 'S(rs1) < S(rs2) :: pc += sext(imm[12|10:5|4:1|11], 12)'
	},
	meta: {
		encoding: 'S',
		importance: NaN
	}
}
