export default {
	mask: '-----------------000-----0100011',
	args: {
		rs2: ['24:20'],
		rs1: ['19:15'],
		imm: ['S32', '31:25', '11:7']
	},
	exec: {
		$: '[rs1 + sext(imm[11:5|4:0], 12), 8] = zext(rs2, 8) //[data, bit_width]'
	},
	meta: {
		encoding: 'S',
		importance: NaN
	}
}
