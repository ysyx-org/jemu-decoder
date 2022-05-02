export default {
	mask: '000000-----------001-----0011011',
	args: {
		imm: ['25:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	sext: true,
	exec: {
		$: '(imm >> 5) == 0 :: rd = sext(rs1 << B64(imm), 32)'
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
