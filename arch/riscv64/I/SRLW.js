export default {
	mask: '0000000----------101-----0111011',
	args: {
		rs2: ['24:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	sext: true,
	exec: {
		$: 'rd = sext(zext(rs1, 32) >> (rs2 & 0b11111n), 32)'
	},
	meta: {
		encoding: 'R',
		importance: NaN
	}
}
