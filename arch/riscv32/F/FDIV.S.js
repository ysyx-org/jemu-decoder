export default {
	mask: '0001100------------------1010011',
	args: {
		rs2: ['24:20'],
		rs1: ['19:15'],
		rm: ['14:12'],
		rd: ['11:7']
	},
	sext: true,
	exec: {
		$: ''
	},
	meta: {
		encoding: '?',
		importance: NaN
	}
}
