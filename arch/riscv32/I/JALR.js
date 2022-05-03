export default {
	mask: '-----------------000-----1100111',
	args: {
		imm: ['S32', '31:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	exec: {
		$: 'var(t) = pc + 4n; pc = (rs1 + sext(imm, 12)) & ~1n; rd = t'
	},
	meta: {
		encoding: 'I',
		importance: NaN
	}
}
