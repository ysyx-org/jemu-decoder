export default {
	mask: '0100000----------101-----0011011',
	args: {
		imm: ['S32', '24:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	exec: {
		$: '(imm >> 5) == 0 :: rd = sext(rs1 >> B64(imm), 32 - imm)'
	},
	meta: {
		encoding: 'R',
		importance: NaN
	}
}
