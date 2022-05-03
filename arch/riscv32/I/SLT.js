export default {
	mask: '0000000----------010-----0110011',
	args: {
		rs2: ['24:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	exec: {
		$: 'rd = B64(S(rs1) < S(rs2)) // B64 Converts a bit into 64bit BigInt'
	},
	meta: {
		encoding: 'R',
		importance: NaN
	}
}
