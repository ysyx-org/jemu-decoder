export default {
	mask: '0100000----------000-----0111011',
	args: {
		rs2: ['24:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	exec: {
		$: 'rd = sext(rs1 - rs2, 32)'
	},
	meta: {
		encoding: 'R',
		importance: NaN
	}
}
