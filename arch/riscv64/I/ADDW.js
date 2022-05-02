export default {
	mask: '0000000----------000-----0111011',
	args: {
		rs2: ['24:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	sext: true,
	exec: {
		$: 'rd = sext(rs1 + rs2, 32)'
	},
	meta: {
		encoding: 'R',
		importance: NaN
	}
}
