export default {
	mask: '-----------------001-----1100011',
	args: {
		rs2: ['24:20'],
		rs1: ['19:15'],
		imm: ['S32', '31:25', '11:7']
	},
	exec: {
		$: 'rs1 != rs2 :: pc += sext(imm[12|10:5|4:1|11], 12)'
	},
	meta: {
		encoding: 'S',
		importance: NaN
	}
}
