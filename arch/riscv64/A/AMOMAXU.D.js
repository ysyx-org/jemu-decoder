export default {
	mask: '11100------------011-----0101111',
	args: {
		q: ['26:26'],
		l: ['25:25'],
		rs2: ['24:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	sext: true,
	exec: {
		$: '// rd = AMO64(MAX([rs1], rs2))'
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
