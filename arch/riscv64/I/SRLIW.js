export default {
	mask: '000000-----------101-----0011011',
	args: {
		rs1: ['19:15'],
		rd: ['11:7'],
		imm: ['S32', '25:20']
	},
	exec: {
		$: '(imm >> 5) == 0 :: rd = sext(zext(rs1, 32) >> B64(imm), 32)'
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
