export default {
	mask: '-----------------111-----1100011',
	args: {
		imm: ['S32', '31:25', '11:7'],
		rs2: ['24:20'],
		rs1: ['19:15']
	},
	exec: {
		$: 'rs1 >= rs2 :: pc += sext(imm[12|10:5|4:1|11], 12)'
	},
	meta: {
		encoding: 'S',
		importance: NaN
	}
}
