export default {
	mask: '0000001----------111-----0110011',
	args: {
		rs2: ['24:20'],
		rs1: ['19:15'],
		rd: ['11:7']
	},
	sext: true,
	exec: {
		$: ''
	},
	meta: {
		encoding: 'R',
		importance: NaN
	}
}
