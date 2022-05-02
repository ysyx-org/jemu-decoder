export default {
	mask: '110000000000-------------1010011',
	args: {
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
