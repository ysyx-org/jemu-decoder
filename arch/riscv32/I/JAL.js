export default {
	mask: '-------------------------1101111',
	args: {
		imm: ['31:12'],
		rd: ['11:7']
	},
	sext: true,
	exec: {
		$: 'rd = pc + 4n; pc += sext(imm[20|10:1|11|19:12], 20)'
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
