export default {
	mask: '00000------------011-----0101111',
	args: {
		q: ['26:26'],
		l: ['25:25'],
		rs2: ['24:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	exec: {
		$: '// rd = AMO64([rs1] + rs2)'
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
