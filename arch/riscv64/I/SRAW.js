export default {
	mask: '0100000----------101-----0111011',
	args: {
		rs2: ['24:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	exec: {
		$: 'rd = sext(rs1 >> (rs2 & 0b11111n), 32 - parseInt(rs2 & 0b11111n))'
	},
	meta: {
		encoding: 'R',
		importance: NaN
	}
}
